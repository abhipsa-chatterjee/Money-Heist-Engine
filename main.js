import { loadStory, getScene, getEnding, applyEffects } from "./engine.js";
import { renderScene, renderEnding, updateStats, showLoading } from "./ui.js";
import { initEditor } from "./editor.js";

const playBtn = document.getElementById("play-mode-btn");
const editBtn = document.getElementById("edit-mode-btn");
const gameView = document.getElementById("game-view");
const editorView = document.getElementById("editor-view");

showLoading();

let storyCache = null;

// Load from localStorage if edited
const saved = localStorage.getItem("storyData");

fetch("./story_data.json")
  .then(res => res.json())
  .then(data => {
    storyCache = saved ? JSON.parse(saved) : data;
    loadStory(storyCache);
    startGame(storyCache.startScene);
  });

function startGame(startId) {
  renderCurrentScene(startId);
}

function renderCurrentScene(id) {
  const scene = getScene(id);

  if (!scene) {
    const ending = getEnding();
    renderEnding(ending.text);
    return;
  }

  renderScene(scene, onChoiceSelected);
  updateStats();
}

function onChoiceSelected(choice) {
  applyEffects(choice.effects);

  if (choice.target === "THE_END") {
    const ending = getEnding();
    renderEnding(ending.text);
  } else {
    renderCurrentScene(choice.target);
  }

  updateStats();
}

/* MODE SWITCHING */
playBtn.onclick = () => {
  playBtn.classList.add("active");
  editBtn.classList.remove("active");
  gameView.classList.remove("hidden");
  editorView.classList.add("hidden");
};

editBtn.onclick = () => {
  editBtn.classList.add("active");
  playBtn.classList.remove("active");
  gameView.classList.add("hidden");
  editorView.classList.remove("hidden");
  initEditor(storyCache);
};