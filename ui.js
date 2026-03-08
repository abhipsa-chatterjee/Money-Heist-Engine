import { state, checkConditions } from "./engine.js";

const descEl = document.getElementById("scene-description");
const titleEl = document.getElementById("scene-title");
const gridEl = document.getElementById("choices-grid");
const logEl = document.getElementById("action-log");

export function showLoading() {
  descEl.innerText = "⏳ Loading story...";
}

export function renderScene(scene, onChoiceClick) {
  titleEl.innerText = scene.id.replace(/_/g, " ");
  descEl.innerText = scene.text;
  gridEl.innerHTML = "";
  // ❌ DO NOT clear log here anymore

  scene.choices.forEach(choice => {
    if (!checkConditions(choice.conditions || {})) return;

    const btn = document.createElement("button");
    btn.innerText = choice.text;

    btn.onclick = () => {
      if (choice.log) {
        logEl.innerText = choice.log;
      }

      onChoiceClick(choice);
    };

    gridEl.appendChild(btn);
  });

  updateStats();
}

export function renderEnding(text) {
  titleEl.innerText = "THE END";
  descEl.innerText = text;
  gridEl.innerHTML = `<button onclick="location.reload()">New Plan</button>`;
}

export function updateStats() {
  document.getElementById("stat-money").innerText = state.money;

  document.getElementById("bar-heat").style.width =
    Math.min(state.policeAlert * 20, 100) + "%";

  document.getElementById("bar-trust").style.width =
    Math.min(state.teamTrust * 20, 100) + "%";

  const pub =
    state.publicOpinion > 1
      ? "Hero"
      : state.publicOpinion < 0
      ? "Villain"
      : "Neutral";

  document.getElementById("stat-public").innerText = pub;

}
