/* Local camera/photo acquisition. Images remain on this device. */
(function () {
  'use strict';
  const find = (id) => document.getElementById('vp-' + id);
  const ui = Object.fromEntries([
    'sheet-upload', 'sheet-camera', 'sheet-file', 'sheet-capture-file',
    'sheet-panel', 'sheet-status', 'sheet-error', 'sheet-name', 'sheet-image',
    'sheet-viewport', 'sheet-remove', 'sheet-rotate', 'sheet-zoom-in',
    'sheet-zoom-out', 'sheet-fit', 'sheet-zoom', 'practice', 'camera-dialog',
    'camera-video', 'camera-close', 'camera-shutter', 'camera-native',
    'camera-status', 'camera-error'
  ].map((id) => [id, find(id)]));
  const MAX_BYTES = 30 * 1024 * 1024;
  const MAX_EDGE = 4096;
  const state = { image: null, name: '', url: null, rotation: 0, zoom: 1, load: 0, render: 0, camera: 0, stream: null };

  function message(id, text) {
    ui[id].textContent = text;
    ui[id].hidden = !text;
  }
  function setZoom(value) {
    state.zoom = Math.max(1, Math.min(3, value));
    ui['sheet-image'].style.width = `${state.zoom * 100}%`;
    ui['sheet-zoom'].textContent = `${Math.round(state.zoom * 100)}%`;
    ui['sheet-zoom-out'].disabled = state.zoom <= 1;
    ui['sheet-zoom-in'].disabled = state.zoom >= 3;
  }
  function encode(canvas) {
    return new Promise((resolve, reject) => canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('The photo could not be prepared. Try a smaller image.'));
    }, 'image/jpeg', 0.95));
  }
  function photoCanvas(image, rotation = 0) {
    const sourceWidth = image.naturalWidth || image.videoWidth;
    const sourceHeight = image.naturalHeight || image.videoHeight;
    if (!sourceWidth || !sourceHeight) throw new Error('The camera is not ready. Wait for the preview, then try again.');
    const scale = Math.min(1, MAX_EDGE / Math.max(sourceWidth, sourceHeight));
    const width = Math.max(1, Math.round(sourceWidth * scale));
    const height = Math.max(1, Math.round(sourceHeight * scale));
    const canvas = document.createElement('canvas');
    const sideways = rotation % 2 !== 0;
    canvas.width = sideways ? height : width;
    canvas.height = sideways ? width : height;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Photo display is unavailable in this browser.');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(rotation * Math.PI / 2);
    context.drawImage(image, -width / 2, -height / 2, width, height);
    return canvas;
  }
  async function renderPhoto(image, name, rotation, load) {
    const render = ++state.render;
    const blob = await encode(photoCanvas(image, rotation));
    if (load !== state.load || render !== state.render) return false;
    const previous = state.url;
    state.url = URL.createObjectURL(blob);
    state.image = image;
    state.name = name;
    state.rotation = rotation;
    ui['sheet-image'].src = state.url;
    ui['sheet-image'].alt = `Sheet-music photo: ${name}`;
    ui['sheet-name'].textContent = name;
    ui['sheet-panel'].hidden = false;
    ui.practice.classList.add('vp-has-sheet');
    if (previous) URL.revokeObjectURL(previous);
    window.dispatchEvent?.(new CustomEvent('vp:photo', { detail: { blob, name } }));
    return true;
  }
  async function loadPhoto(file) {
    if (!file) return;
    const load = ++state.load;
    message('sheet-error', '');
    message('sheet-status', '');
    if (file.type && !file.type.startsWith('image/')) {
      message('sheet-error', 'Choose a photo such as a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > MAX_BYTES) {
      message('sheet-error', 'This photo is too large. Choose an image smaller than 30 MB.');
      return;
    }
    message('sheet-status', 'Opening photo…');
    const source = URL.createObjectURL(file);
    try {
      const image = new Image();
      image.src = source;
      await image.decode();
      if (load !== state.load) return;
      if (await renderPhoto(image, file.name || 'Camera photo', 0, load)) {
        setZoom(1);
        ui['sheet-viewport'].scrollTop = ui['sheet-viewport'].scrollLeft = 0;
        message('sheet-status', '');
      }
    } catch (error) {
      if (load !== state.load) return;
      message('sheet-status', '');
      message('sheet-error', 'This photo could not be opened. Try a JPG, PNG, or WebP image.');
    } finally {
      URL.revokeObjectURL(source);
    }
  }
  function removePhoto() {
    state.load++;
    state.render++;
    if (state.url) URL.revokeObjectURL(state.url);
    state.url = state.image = null;
    state.name = '';
    ui['sheet-image'].removeAttribute('src');
    ui['sheet-name'].textContent = '';
    ui['sheet-panel'].hidden = true;
    ui.practice.classList.remove('vp-has-sheet');
    window.dispatchEvent?.(new CustomEvent('vp:photo', { detail: null }));
    message('sheet-status', '');
    message('sheet-error', '');
    ui['sheet-upload'].focus();
  }
  async function rotatePhoto() {
    if (!state.image) return;
    const load = state.load;
    const rotation = (state.rotation + 1) % 4;
    ui['sheet-rotate'].disabled = true;
    try {
      if (await renderPhoto(state.image, state.name, rotation, load)) {
        ui['sheet-viewport'].scrollTop = ui['sheet-viewport'].scrollLeft = 0;
      }
    } catch (error) {
      if (load === state.load) message('sheet-error', error.message);
    } finally {
      ui['sheet-rotate'].disabled = false;
    }
  }

  function stopCamera() {
    state.camera++;
    state.stream?.getTracks().forEach((track) => track.stop());
    state.stream = null;
    ui['camera-video'].srcObject = null;
    ui['camera-shutter'].disabled = true;
  }
  function closeCamera() {
    stopCamera();
    if (ui['camera-dialog'].open) ui['camera-dialog'].close();
  }
  async function openCamera() {
    // Native capture also works on mobile browsers without a live-preview API.
    if (!navigator.mediaDevices?.getUserMedia || !ui['camera-dialog'].showModal) {
      ui['sheet-capture-file'].click();
      return;
    }
    stopCamera();
    const camera = state.camera;
    message('camera-error', '');
    message('camera-status', 'Waiting for camera permission…');
    ui['camera-dialog'].showModal();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 2560 }, height: { ideal: 1920 } }
      });
      if (camera !== state.camera) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      state.stream = stream;
      stream.getVideoTracks().forEach((track) => track.addEventListener('ended', () => {
        if (state.stream !== stream) return;
        stopCamera();
        message('camera-status', '');
        message('camera-error', 'The camera disconnected. Close this window and try again.');
      }, { once: true }));
      ui['camera-video'].srcObject = stream;
      await ui['camera-video'].play();
      if (camera !== state.camera) return;
      cameraReady();
    } catch (error) {
      if (camera !== state.camera) return;
      stopCamera();
      const messages = {
        NotAllowedError: 'Camera access was denied. Allow it in your browser settings, or upload a photo.',
        NotFoundError: 'No camera was found. Connect a camera or upload a photo.',
        NotReadableError: 'The camera could not open. Close other apps using it, then try again.',
        OverconstrainedError: 'This camera cannot provide a preview. Try the camera app or upload a photo.'
      };
      message('camera-status', '');
      message('camera-error', messages[error.name] || 'The camera could not start. Try the camera app or upload a photo.');
    }
  }
  function cameraReady() {
    if (!state.stream || !ui['camera-video'].videoWidth || !ui['camera-video'].videoHeight) return;
    ui['camera-shutter'].disabled = false;
    message('camera-status', '');
  }
  async function capturePhoto() {
    if (!state.stream || ui['camera-shutter'].disabled) return;
    const camera = state.camera;
    ui['camera-shutter'].disabled = true;
    try {
      const blob = await encode(photoCanvas(ui['camera-video']));
      if (camera !== state.camera) return;
      closeCamera();
      await loadPhoto(new File([blob], 'Camera photo.jpg', { type: 'image/jpeg' }));
    } catch (error) {
      if (camera !== state.camera) return;
      message('camera-error', error.message || 'The photo could not be captured. Try again.');
      cameraReady();
    }
  }

  ui['sheet-upload'].addEventListener('click', () => ui['sheet-file'].click());
  ui['sheet-camera'].addEventListener('click', openCamera);
  for (const id of ['sheet-file', 'sheet-capture-file']) {
    ui[id].addEventListener('change', () => {
      const file = ui[id].files?.[0];
      ui[id].value = ''; // Allow selecting the same photo again.
      return loadPhoto(file);
    });
  }
  ui['sheet-remove'].addEventListener('click', removePhoto);
  ui['sheet-rotate'].addEventListener('click', rotatePhoto);
  ui['sheet-zoom-in'].addEventListener('click', () => setZoom(state.zoom + 0.25));
  ui['sheet-zoom-out'].addEventListener('click', () => setZoom(state.zoom - 0.25));
  ui['sheet-fit'].addEventListener('click', () => {
    setZoom(1);
    ui['sheet-viewport'].scrollLeft = 0;
  });
  ui['camera-close'].addEventListener('click', closeCamera);
  ui['camera-dialog'].addEventListener('cancel', (event) => { event.preventDefault(); closeCamera(); });
  ui['camera-dialog'].addEventListener('close', stopCamera);
  ui['camera-video'].addEventListener('loadeddata', cameraReady);
  ui['camera-shutter'].addEventListener('click', capturePhoto);
  ui['camera-native'].addEventListener('click', () => { closeCamera(); ui['sheet-capture-file'].click(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) closeCamera(); });
  window.addEventListener('pagehide', closeCamera);
  setZoom(1);
})();
