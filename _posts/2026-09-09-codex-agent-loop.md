---
layout: default
title: "How the Codex Agent Loop Works"
date: 2026-09-09
permalink: /codex-agent-loop.html
description: "A source-grounded visual guide to Codex model sampling, tool feedback, pending input, stop hooks, and optional Goal continuation."
excerpt: "A source-grounded visual guide to the Codex turn loop: model sampling, tool feedback, pending input, stop hooks, and optional Goal continuation."
---

<article class="loop-page">
  <div class="loop-hero">
    <div>
      <p class="loop-eyebrow">CODEX INTERNALS · VISUAL GUIDE</p>
      <h1>How the Codex agent loop works</h1>
      <p class="loop-lede">A Codex turn is not one model response. It is a runtime loop that can sample the model, execute tools, add their results to history, accept new input, and sample again before the turn ends.</p>
    </div>
    <div class="loop-hero-mark" aria-hidden="true">
      <span>MODEL</span>
      <b>↻</b>
      <span>TOOLS</span>
    </div>
  </div>

  <section class="loop-thesis" aria-label="Central idea">
    <span class="loop-thesis-label">Central idea</span>
    <p>The model proposes the next action. The runtime deterministically decides whether another sampling request is needed.</p>
  </section>

  <section class="loop-visual" aria-labelledby="loop-visual-title">
    <div class="loop-section-heading">
      <div>
        <p class="loop-kicker">INTERACTIVE TRACE</p>
        <h2 id="loop-visual-title">Follow one execution path</h2>
      </div>
      <div class="route-controls" aria-label="Select an execution path">
        <button type="button" data-route-button="normal" aria-pressed="true">Normal finish</button>
        <button type="button" data-route-button="tool" aria-pressed="false">Tool feedback</button>
        <button type="button" data-route-button="input" aria-pressed="false">Pending input</button>
        <button type="button" data-route-button="goal" aria-pressed="false">Active goal</button>
      </div>
    </div>

    <div class="loop-columns">
      <section class="loop-lane lane-blue" aria-labelledby="input-sample-title">
        <div class="lane-heading">
          <p>PHASE 1</p>
          <h3 id="input-sample-title">Input &amp; sample</h3>
        </div>
        <p class="lane-summary">Build one inference request, then consume its streamed response.</p>

        <div class="flow-node route-item is-active" data-routes="normal tool input goal">
          <span class="node-icon">USER</span>
          <div><strong>User submits a task</strong><small>The request starts a regular turn when the thread is idle, or steers an active turn.</small></div>
        </div>
        <div class="flow-connector route-item is-active" data-routes="normal tool input goal"><span>1</span></div>
        <div class="flow-node route-item is-active" data-routes="normal tool input goal">
          <span class="node-icon">CTX</span>
          <div><strong>Build model input</strong><small>Conversation history, instructions, tool definitions, and current context.</small></div>
        </div>
        <div class="flow-connector route-item is-active" data-routes="normal tool input goal"><span>2</span></div>
        <div class="flow-node route-item is-active" data-routes="normal tool input goal">
          <span class="node-icon">LLM</span>
          <div><strong>Sample the model</strong><small>Codex sends one inference request and consumes streamed events.</small></div>
        </div>
        <div class="flow-connector route-item is-active" data-routes="normal tool input goal"><span>3</span></div>
        <div class="flow-node route-item is-active" data-routes="normal tool input goal">
          <span class="node-icon">SSE</span>
          <div><strong>Receive response items</strong><small>Messages, reasoning, tool calls, and a terminal <code>response.completed</code> event.</small></div>
        </div>

        <div class="lane-fact">
          <strong><code>response.completed</code> is required</strong>
          <span>If the stream closes first, the sampling request fails. <code>end_turn</code> is optional.</span>
        </div>
      </section>

      <section class="loop-lane lane-teal" aria-labelledby="action-loop-title">
        <div class="lane-heading">
          <p>PHASE 2</p>
          <h3 id="action-loop-title">Action loop</h3>
        </div>
        <p class="lane-summary">Tool feedback and newly queued input can force another model sample.</p>

        <div class="flow-node route-item" data-routes="tool">
          <span class="node-icon">TOOL</span>
          <div><strong>Route any tool call</strong><small><code>ToolRouter</code> can dispatch shell, patch, MCP, agent, Goal, and other registered tools.</small></div>
        </div>
        <div class="flow-connector route-item" data-routes="tool"><span>4</span></div>
        <div class="flow-node route-item" data-routes="tool">
          <span class="node-icon">OUT</span>
          <div><strong>Record the result</strong><small>The tool output is appended to conversation history before the next sample.</small></div>
        </div>

        <div class="pending-node route-item" data-routes="input">
          <span class="node-icon">IN</span>
          <div><strong>Pending input</strong><small>User steering, injected client context, or an inter-agent mailbox item.</small></div>
        </div>

        <div class="flow-connector route-item is-active" data-routes="normal tool input goal"><span>5</span></div>
        <div class="gate-node route-item is-active" data-routes="normal tool input goal">
          <strong>Continue this turn?</strong>
          <code>model_needs_follow_up<br>OR has_pending_input</code>
        </div>

        <div class="loopback route-item" data-routes="tool input">
          <span>YES</span>
          <strong>Append feedback → sample again</strong>
        </div>

        <div class="flow-connector route-item" data-routes="normal goal"><span>6</span></div>
        <div class="flow-node route-item" data-routes="normal goal">
          <span class="node-icon">HOOK</span>
          <div><strong>Run stop hooks</strong><small>A blocking hook can inject continuation feedback and send the loop back to sampling.</small></div>
        </div>
        <div class="flow-connector route-item" data-routes="normal goal"><span>7</span></div>
        <div class="flow-node route-item" data-routes="normal goal">
          <span class="node-icon">END</span>
          <div><strong>Turn ends</strong><small>No model follow-up, no pending input, and no hook-requested continuation remain.</small></div>
        </div>
      </section>

      <section class="loop-lane lane-purple" aria-labelledby="goal-title">
        <div class="lane-heading">
          <p>PHASE 3</p>
          <h3 id="goal-title">Goal continuation</h3>
        </div>
        <p class="lane-summary">An optional outer loop can start a new turn after Codex becomes idle.</p>

        <div class="flow-node route-item" data-routes="normal goal">
          <span class="node-icon">GOAL</span>
          <div><strong>Read persisted Goal status</strong><small>The Goal extension checks only while the thread is idle.</small></div>
        </div>

        <div class="flow-connector route-item" data-routes="goal"><span>8</span></div>
        <div class="flow-node route-item" data-routes="goal">
          <span class="node-icon">OBJ</span>
          <div><strong>Render <code>continuation.md</code></strong><small>The current <code>Goal.objective</code> is placed inside an <code>&lt;objective&gt;</code> block.</small></div>
        </div>
        <div class="flow-connector route-item" data-routes="goal"><span>9</span></div>
        <div class="flow-node route-item" data-routes="goal">
          <span class="node-icon">NEXT</span>
          <div><strong>Start a new turn</strong><small><code>start_turn_if_idle()</code> submits the hidden user-role context fragment.</small></div>
        </div>
        <div class="loopback route-item" data-routes="goal">
          <span>ACTIVE</span>
          <strong>New turn → model sample</strong>
        </div>

        <div class="idle-path route-item" data-routes="normal">
          <span class="node-icon">IDLE</span>
          <div><strong>Stay idle</strong><small>No Goal, or a Complete, Blocked, Paused, or Limited Goal, does not restart work.</small></div>
        </div>

        <div class="lane-fact">
          <strong>Goal is optional</strong>
          <span>Ordinary turns stop using the inner runtime gate. A Goal adds cross-turn persistence; it is not required for tool use.</span>
        </div>
      </section>
    </div>

    <p class="route-caption" aria-live="polite">No follow-up and no pending input: stop hooks run, the turn ends, and Codex remains idle unless an Active Goal restarts it.</p>
  </section>

  <section class="loop-explanation">
    <p class="loop-kicker">THE TWO LOOPS</p>
    <h2>Keep “sample again” separate from “start another turn”</h2>
    <div class="concept-grid">
      <article>
        <span class="concept-number">01</span>
        <h3>Inner loop: within one turn</h3>
        <p>A sampling response can request tools. Codex runs them, records their results, and sends the enlarged history back to the model. This repeats inside the same turn while either continuation flag is true.</p>
        <pre><code>needs_follow_up =
  model_needs_follow_up
  || has_pending_input</code></pre>
      </article>
      <article>
        <span class="concept-number">02</span>
        <h3>Outer loop: across turns</h3>
        <p>After a turn finishes, the optional Goal extension can inspect persisted state. Only an Active Goal renders the continuation prompt and attempts to start another turn.</p>
        <pre><code>if goal.status == Active:
  inject(&lt;objective&gt;...)
  start_turn_if_idle()</code></pre>
      </article>
    </div>
  </section>

  <section class="loop-explanation">
    <p class="loop-kicker">CONTINUATION CONDITIONS</p>
    <h2>What makes the model run again?</h2>
    <div class="condition-table" role="table" aria-label="Conditions that continue the current turn">
      <div class="condition-row condition-head" role="row">
        <span role="columnheader">Signal</span><span role="columnheader">Where it comes from</span><span role="columnheader">Effect</span>
      </div>
      <div class="condition-row" role="row">
        <strong role="cell">Valid tool call</strong><span role="cell"><code>handle_output_item_done</code> schedules tool execution.</span><span role="cell">Sets <code>model_needs_follow_up = true</code>.</span>
      </div>
      <div class="condition-row" role="row">
        <strong role="cell">Rejected or invalid tool request</strong><span role="cell">Codex records feedback for the model.</span><span role="cell">Also forces a follow-up sample.</span>
      </div>
      <div class="condition-row" role="row">
        <strong role="cell"><code>end_turn: false</code></strong><span role="cell">Optional field on <code>response.completed</code>.</span><span role="cell">Explicitly requests another sample.</span>
      </div>
      <div class="condition-row" role="row">
        <strong role="cell">Pending input</strong><span role="cell">Turn queue or accepted agent mailbox delivery.</span><span role="cell">Sets <code>has_pending_input = true</code>.</span>
      </div>
    </div>
    <div class="answer-note">
      <strong>A final response is not detected by a magic phrase.</strong>
      <p>The model does not need to say “this is final.” Once the stream completes, Codex checks concrete runtime state. An absent or true <code>end_turn</code> does not override a tool call, queued input, or blocking stop hook.</p>
    </div>
  </section>

  <section class="loop-explanation goal-detail">
    <p class="loop-kicker">GOALS &amp; COMPLETION</p>
    <h2>How Codex decides a Goal is complete</h2>
    <div class="goal-detail-grid">
      <div>
        <h3>The prompt asks for an evidence audit</h3>
        <p>The current <code>continuation.md</code> tells the model to derive concrete requirements, inspect authoritative evidence, and treat uncertain or missing evidence as incomplete.</p>
      </div>
      <div>
        <h3>The model calls <code>update_goal</code></h3>
        <p>The semantic judgment is model-led and evidence-guided. The runtime validates and persists the requested Goal status; it does not independently prove that an arbitrary objective is complete.</p>
      </div>
      <div>
        <h3><code>&lt;objective&gt;</code> is the Goal objective</h3>
        <p>The template inserts <code>Goal.objective</code> into hidden user-role context. The Goal itself also carries status and optional budget/accounting data.</p>
      </div>
    </div>
  </section>

  <section class="source-map">
    <p class="loop-kicker">SOURCE MAP</p>
    <h2>Where the behavior is defined</h2>
    <p class="source-intro">This guide was checked against the local Codex source snapshot on 9 September 2026. Links below follow the corresponding files on the Codex main branch.</p>
    <ul>
      <li><a href="https://github.com/openai/codex/blob/main/codex-rs/core/src/session/turn.rs">core/src/session/turn.rs</a><span>Sampling loop, combined continuation gate, stop hooks, <code>response.completed</code>, and <code>end_turn</code>.</span></li>
      <li><a href="https://github.com/openai/codex/blob/main/codex-rs/core/src/stream_events_utils.rs">core/src/stream_events_utils.rs</a><span>Tool-call detection, execution scheduling, and <code>needs_follow_up</code>.</span></li>
      <li><a href="https://github.com/openai/codex/blob/main/codex-rs/core/src/session/input_queue.rs">core/src/session/input_queue.rs</a><span>Pending turn input and mailbox-delivery checks.</span></li>
      <li><a href="https://github.com/openai/codex/blob/main/codex-rs/core/src/tools/router.rs">core/src/tools/router.rs</a><span>Generic routing for registered tools.</span></li>
      <li><a href="https://github.com/openai/codex/blob/main/codex-rs/ext/goal/src/runtime.rs">ext/goal/src/runtime.rs</a><span>Active Goal check and <code>start_turn_if_idle()</code>.</span></li>
      <li><a href="https://github.com/openai/codex/blob/main/codex-rs/ext/goal/src/steering.rs">ext/goal/src/steering.rs</a><span>Rendering Goal continuation as internal user context.</span></li>
      <li><a href="https://github.com/openai/codex/blob/main/codex-rs/ext/goal/templates/goals/continuation.md">ext/goal/templates/goals/continuation.md</a><span>Objective, budget, progress, completion-audit, and blocked-audit instructions.</span></li>
    </ul>
  </section>
</article>

<style>
  .loop-page {
    --loop-ink: #172033;
    --loop-muted: #647084;
    --loop-line: #dbe2eb;
    --loop-paper: #fbfcfe;
    --loop-blue: #2f66ed;
    --loop-blue-soft: #eaf1ff;
    --loop-teal: #119aa7;
    --loop-teal-soft: #e7f7f7;
    --loop-purple: #7540de;
    --loop-purple-soft: #f1eafe;
    --loop-coral: #f0805a;
    color: var(--loop-ink);
  }

  .loop-page h1,
  .loop-page h2,
  .loop-page h3,
  .loop-page p { margin-top: 0; }

  .loop-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 2rem;
    margin: 0 0 1.25rem;
    padding: 2.4rem;
    overflow: hidden;
    border: 1px solid var(--loop-line);
    border-radius: 24px;
    background:
      radial-gradient(circle at 92% 14%, rgba(117, 64, 222, .16), transparent 32%),
      radial-gradient(circle at 70% 88%, rgba(17, 154, 167, .13), transparent 28%),
      linear-gradient(135deg, #f9fbff, #ffffff);
  }

  .loop-eyebrow,
  .loop-kicker {
    margin-bottom: .55rem;
    color: var(--loop-blue);
    font-size: .76rem;
    font-weight: 800;
    letter-spacing: .12em;
  }

  .loop-hero h1 {
    max-width: 620px;
    margin-bottom: .75rem;
    font-size: clamp(2.15rem, 5.2vw, 4.15rem);
    letter-spacing: -.045em;
  }

  .loop-lede {
    max-width: 640px;
    margin-bottom: 0;
    color: var(--loop-muted);
    font-size: 1.05rem;
  }

  .loop-hero-mark {
    display: grid;
    place-items: center;
    width: 154px;
    aspect-ratio: 1;
    border: 2px solid var(--loop-ink);
    border-radius: 50%;
    background: rgba(255, 255, 255, .76);
    box-shadow: 14px 14px 0 var(--loop-blue-soft);
    font-size: .72rem;
    font-weight: 800;
    letter-spacing: .08em;
  }

  .loop-hero-mark b {
    margin: -.9rem 0;
    color: var(--loop-purple);
    font-size: 3.1rem;
    line-height: 1;
  }

  .loop-thesis {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2.5rem;
    padding: 1rem 1.25rem;
    border-radius: 14px;
    background: var(--loop-ink);
    color: #fff;
  }

  .loop-thesis p { margin: 0; }

  .loop-thesis-label {
    flex: 0 0 auto;
    padding: .35rem .65rem;
    border-radius: 999px;
    background: var(--loop-coral);
    color: #172033;
    font-size: .75rem;
    font-weight: 800;
    letter-spacing: .04em;
    text-transform: uppercase;
  }

  .loop-visual,
  .loop-explanation,
  .source-map { margin-top: 3.5rem; }

  .loop-section-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .loop-section-heading h2,
  .loop-explanation h2,
  .source-map h2 {
    margin-bottom: 0;
    font-size: clamp(1.55rem, 3vw, 2.25rem);
    letter-spacing: -.025em;
  }

  .route-controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: .45rem;
  }

  .route-controls button {
    appearance: none;
    padding: .55rem .78rem;
    border: 1px solid var(--loop-line);
    border-radius: 999px;
    background: #fff;
    color: var(--loop-ink);
    cursor: pointer;
    font: inherit;
    font-size: .78rem;
    font-weight: 700;
  }

  .route-controls button:hover { border-color: var(--loop-blue); }

  .route-controls button:focus-visible {
    outline: 3px solid rgba(47, 102, 237, .25);
    outline-offset: 2px;
  }

  .route-controls button[aria-pressed="true"] {
    border-color: var(--loop-ink);
    background: var(--loop-ink);
    color: #fff;
  }

  .loop-columns {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: .8rem;
  }

  .loop-lane {
    position: relative;
    min-width: 0;
    padding: .8rem;
    border: 1.5px solid var(--loop-ink);
    border-radius: 18px;
    background: #fff;
  }

  .lane-heading {
    margin: -.8rem -.8rem .75rem;
    padding: 1rem;
    border-radius: 16px 16px 12px 12px;
    color: #fff;
    text-align: center;
  }

  .lane-blue .lane-heading { background: linear-gradient(135deg, #2457dc, #3f7af5); }
  .lane-teal .lane-heading { background: linear-gradient(135deg, #0b8491, #19a9b5); }
  .lane-purple .lane-heading { background: linear-gradient(135deg, #6631ce, #8955e8); }

  .lane-heading p {
    margin-bottom: .15rem;
    font-size: .65rem;
    font-weight: 800;
    letter-spacing: .12em;
    opacity: .8;
  }

  .lane-heading h3 { margin: 0; font-size: 1.08rem; }

  .lane-summary {
    min-height: 4.2rem;
    margin-bottom: 1rem;
    padding: .75rem;
    border-radius: 11px;
    background: var(--loop-paper);
    color: var(--loop-muted);
    font-size: .78rem;
    text-align: center;
  }

  .flow-node,
  .pending-node,
  .idle-path {
    display: grid;
    grid-template-columns: 50px minmax(0, 1fr);
    align-items: center;
    gap: .65rem;
    padding: .62rem;
    border-radius: 12px;
  }

  .node-icon {
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    border: 2px solid var(--loop-ink);
    border-radius: 14px;
    font-size: .63rem;
    font-weight: 900;
    letter-spacing: .04em;
  }

  .lane-blue .node-icon { background: var(--loop-blue-soft); }
  .lane-teal .node-icon { background: var(--loop-teal-soft); }
  .lane-purple .node-icon { background: var(--loop-purple-soft); }

  .flow-node strong,
  .pending-node strong,
  .idle-path strong {
    display: block;
    font-size: .8rem;
    line-height: 1.35;
  }

  .flow-node small,
  .pending-node small,
  .idle-path small {
    display: block;
    margin-top: .2rem;
    color: var(--loop-muted);
    font-size: .67rem;
    line-height: 1.45;
  }

  .flow-node code,
  .pending-node code,
  .idle-path code { font-size: .62rem; }

  .flow-connector {
    position: relative;
    width: 2px;
    height: 37px;
    margin: 2px auto;
    border-left: 2px dashed var(--loop-ink);
  }

  .flow-connector::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: -5px;
    width: 8px;
    height: 8px;
    border-right: 2px solid var(--loop-ink);
    border-bottom: 2px solid var(--loop-ink);
    transform: rotate(45deg);
  }

  .flow-connector span {
    position: absolute;
    top: 50%;
    left: 50%;
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border: 2px solid #fff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: .65rem;
    font-weight: 800;
  }

  .lane-blue .flow-connector span { background: var(--loop-blue); }
  .lane-teal .flow-connector span { background: var(--loop-teal); }
  .lane-purple .flow-connector span { background: var(--loop-purple); }

  .lane-fact {
    margin-top: 1rem;
    padding: .8rem;
    border-radius: 11px;
    background: var(--loop-paper);
    font-size: .7rem;
  }

  .lane-fact strong,
  .lane-fact span { display: block; }
  .lane-fact span { margin-top: .25rem; color: var(--loop-muted); }

  .gate-node {
    padding: 1.25rem .55rem;
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
    background: var(--loop-teal-soft);
    text-align: center;
  }

  .gate-node strong { display: block; font-size: .78rem; }
  .gate-node code { font-size: .62rem; line-height: 1.5; }

  .pending-node {
    margin-top: .7rem;
    border: 1px dashed var(--loop-teal);
    background: var(--loop-teal-soft);
  }

  .loopback {
    margin: .85rem 0;
    padding: .65rem;
    border: 2px dashed currentColor;
    border-radius: 999px;
    color: var(--loop-teal);
    font-size: .69rem;
    text-align: center;
  }

  .lane-purple .loopback { color: var(--loop-purple); }

  .loopback span {
    margin-right: .35rem;
    font-size: .58rem;
    font-weight: 900;
    letter-spacing: .08em;
  }

  .idle-path {
    margin-top: 1rem;
    border: 1px dashed var(--loop-purple);
    background: var(--loop-purple-soft);
  }

  .route-item {
    opacity: .18;
    filter: grayscale(.35);
    transition: opacity .16s ease, filter .16s ease, transform .16s ease;
  }

  .route-item.is-active {
    opacity: 1;
    filter: none;
  }

  .flow-node.route-item.is-active,
  .pending-node.route-item.is-active,
  .idle-path.route-item.is-active { transform: translateY(-1px); }

  .route-caption {
    min-height: 2.8rem;
    margin: 1rem auto 0;
    color: var(--loop-muted);
    font-size: .82rem;
    text-align: center;
  }

  .concept-grid,
  .goal-detail-grid {
    display: grid;
    gap: 1rem;
    margin-top: 1.2rem;
  }

  .concept-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .goal-detail-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }

  .concept-grid article,
  .goal-detail-grid > div {
    padding: 1.25rem;
    border: 1px solid var(--loop-line);
    border-radius: 16px;
    background: var(--loop-paper);
  }

  .concept-number {
    color: var(--loop-blue);
    font-size: .75rem;
    font-weight: 900;
    letter-spacing: .1em;
  }

  .concept-grid h3,
  .goal-detail-grid h3 { margin: .5rem 0; font-size: 1rem; }

  .concept-grid p,
  .goal-detail-grid p {
    margin-bottom: 0;
    color: var(--loop-muted);
    font-size: .88rem;
  }

  .concept-grid pre {
    margin: 1rem 0 0;
    padding: .8rem;
    font-size: .72rem;
  }

  .condition-table {
    margin-top: 1.2rem;
    overflow: hidden;
    border: 1px solid var(--loop-line);
    border-radius: 16px;
  }

  .condition-row {
    display: grid;
    grid-template-columns: .9fr 1.25fr 1fr;
    gap: 1rem;
    padding: .9rem 1rem;
    border-top: 1px solid var(--loop-line);
    font-size: .82rem;
  }

  .condition-row:first-child { border-top: 0; }
  .condition-row span { color: var(--loop-muted); }
  .condition-head { background: var(--loop-ink); color: #fff; font-weight: 800; }
  .condition-head span { color: #fff; }

  .answer-note {
    margin-top: 1rem;
    padding: 1rem 1.2rem;
    border-left: 5px solid var(--loop-coral);
    border-radius: 0 12px 12px 0;
    background: #fff4ef;
  }

  .answer-note p { margin: .3rem 0 0; color: #704838; font-size: .88rem; }

  .source-intro { max-width: 680px; color: var(--loop-muted); }

  .source-map ul {
    margin: 1.25rem 0 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--loop-line);
  }

  .source-map li {
    display: grid;
    grid-template-columns: minmax(210px, .85fr) minmax(0, 1.5fr);
    gap: 1rem;
    padding: .8rem 0;
    border-bottom: 1px solid var(--loop-line);
    font-size: .82rem;
  }

  .source-map li a { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-weight: 700; }
  .source-map li span { color: var(--loop-muted); }

  @media (max-width: 760px) {
    .loop-hero { grid-template-columns: 1fr; padding: 1.5rem; }
    .loop-hero-mark { display: none; }
    .loop-section-heading { align-items: flex-start; flex-direction: column; }
    .route-controls { justify-content: flex-start; }
    .loop-columns { grid-template-columns: 1fr; }
    .lane-summary { min-height: 0; }
    .concept-grid,
    .goal-detail-grid { grid-template-columns: 1fr; }
    .condition-row { grid-template-columns: 1fr; gap: .25rem; }
    .condition-head { display: none; }
    .source-map li { grid-template-columns: 1fr; gap: .2rem; }
    .loop-thesis { align-items: flex-start; flex-direction: column; }
  }

  @media (prefers-reduced-motion: reduce) {
    .route-item { transition: none; }
  }
</style>

<script>
  (() => {
    const root = document.querySelector('.loop-page');
    if (!root) return;

    const buttons = Array.from(root.querySelectorAll('[data-route-button]'));
    const items = Array.from(root.querySelectorAll('[data-routes]'));
    const caption = root.querySelector('.route-caption');
    const captions = {
      normal: 'No follow-up and no pending input: stop hooks run, the turn ends, and Codex remains idle unless an Active Goal restarts it.',
      tool: 'A tool call sets model_needs_follow_up. Codex records the tool result, adds it to history, and samples the model again in the same turn.',
      input: 'Queued user steering, injected context, or accepted agent-mailbox input sets has_pending_input and continues the current turn.',
      goal: 'After turn end, an Active Goal injects Goal.objective through continuation.md and starts a new turn while the thread is idle.'
    };

    function selectRoute(route) {
      buttons.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.routeButton === route));
      });
      items.forEach((item) => {
        const routes = item.dataset.routes.split(' ');
        item.classList.toggle('is-active', routes.includes(route));
      });
      caption.textContent = captions[route];
    }

    buttons.forEach((button) => {
      button.addEventListener('click', () => selectRoute(button.dataset.routeButton));
    });

    selectRoute('normal');
  })();
</script>
