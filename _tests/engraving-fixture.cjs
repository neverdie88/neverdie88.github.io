// Run the bundled production engraver with real font measurement and raster
// drawing. This is a headless rendering test, not a browser interaction test.
const fs=require('node:fs');
const {createCanvas}=require('@napi-rs/canvas');
const bundle=fs.readFileSync(`${__dirname}/../sheet-music/lib/opensheetmusicdisplay.min.js`,'utf8');
function install(win){
  const canvases=new WeakMap();
  win.HTMLCanvasElement.prototype.getContext=function(kind){
    let canvas=canvases.get(this);
    if(!canvas||canvas.width!==this.width||canvas.height!==this.height){canvas=createCanvas(this.width||300,this.height||150);canvases.set(this,canvas);}
    return canvas.getContext(kind);
  };
  Object.defineProperty(win.HTMLElement.prototype,'offsetWidth',{configurable:true,get(){return parseFloat(this.style.width)||this.parentElement?.offsetWidth||900;}});
  win.eval(bundle);
}
module.exports={install};
