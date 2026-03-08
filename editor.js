let originalStory = null;

export function initEditor(storyData) {


  if (!localStorage.getItem("originalStory")) {
    localStorage.setItem("originalStory", JSON.stringify(storyData));
  }

  originalStory = JSON.parse(localStorage.getItem("originalStory"));

  const editorView = document.getElementById("editor-view");

  editorView.innerHTML = `
    <div class="editor-layout">
      <div class="scene-sidebar">
        <h3>Scenes</h3>
        <ul id="scene-list"></ul>
        <button id="add-scene">➕ Add Scene</button>
        <button id="reset-story">⏪ Reset Story</button>
      </div>

      <div class="scene-editor-form">
        <h3 id="scene-title-editor">Select a scene</h3>

        <div class="form-group">
          <label>Scene Text</label>
          <textarea id="scene-text"></textarea>
        </div>

        <h3>Choices</h3>
        <div id="choices-editor"></div>

        <button class="btn-save" id="save-story">Save Story</button>
      </div>
    </div>
  `;

  const sceneList = document.getElementById("scene-list");
  const sceneText = document.getElementById("scene-text");
  const choicesEditor = document.getElementById("choices-editor");
  const titleEditor = document.getElementById("scene-title-editor");
  const resetBtn = document.getElementById("reset-story");

  let currentScene = null;

  function refreshSceneList() {
    sceneList.innerHTML = "";
    storyData.scenes.forEach(scene => {
      const li = document.createElement("li");
      li.innerText = scene.id;
      li.onclick = () => loadScene(scene);
      sceneList.appendChild(li);
    });
  }

  function loadScene(scene) {
    currentScene = scene;
    titleEditor.innerText = scene.id;
    sceneText.value = scene.text;
    renderChoices();
  }

  function renderChoices() {
    choicesEditor.innerHTML = "";

    currentScene.choices.forEach((choice, index) => {
      const div = document.createElement("div");
      div.className = "choice-edit-card";

      div.innerHTML = `
        <div class="form-group">
          <label>Choice Text</label>
          <input value="${choice.text}">
        </div>

        <div class="form-group">
          <label>Goes To Scene</label>
          <select></select>
        </div>

        <div class="form-group">
          <label>Effects</label>
          <input value="${effectsToText(choice.effects || {})}">
        </div>

        <button>❌ Delete Choice</button>
      `;

      const textInput = div.querySelector("input");
      const select = div.querySelector("select");
      const effectsInput = div.querySelectorAll("input")[1];
      const deleteBtn = div.querySelector("button");

      storyData.scenes.forEach(s => {
        const opt = document.createElement("option");
        opt.value = s.id;
        opt.innerText = s.id;
        if (s.id === choice.target) opt.selected = true;
        select.appendChild(opt);
      });

      textInput.oninput = e => choice.text = e.target.value;
      select.onchange = e => choice.target = e.target.value;
      effectsInput.oninput = e => choice.effects = parseEffects(e.target.value);

      deleteBtn.onclick = () => {
        currentScene.choices.splice(index, 1);
        renderChoices();
      };

      choicesEditor.appendChild(div);
    });

    const addBtn = document.createElement("button");
    addBtn.innerText = "➕ Add Choice";
    addBtn.onclick = () => {
      currentScene.choices.push({
        text: "New choice",
        target: storyData.scenes[0].id,
        effects: {}
      });
      renderChoices();
    };

    choicesEditor.appendChild(addBtn);
  }

  function effectsToText(effects) {
    return Object.entries(effects)
      .map(([k, v]) => `${k}:${v}`)
      .join(", ");
  }

  function parseEffects(text) {
    const obj = {};
    text.split(",").forEach(pair => {
      const [k, v] = pair.split(":");
      if (k && v) obj[k.trim()] = Number(v);
    });
    return obj;
  }

  document.getElementById("save-story").onclick = () => {
    if (!currentScene) return;
    currentScene.text = sceneText.value;
    localStorage.setItem("storyData", JSON.stringify(storyData));
    alert("Story saved!");
    location.reload();
  };

  document.getElementById("add-scene").onclick = () => {
    const id = prompt("New scene ID:");
    if (!id) return;
    storyData.scenes.push({ id, text: "New scene", choices: [] });
    refreshSceneList();
  };

  resetBtn.onclick = async () => {
  if (!confirm("Reset story to original file?")) return;

  const res = await fetch("story_data.json");
  const original = await res.json();

  localStorage.setItem("storyData", JSON.stringify(original));
  localStorage.removeItem("originalStory"); // optional cleanup

  alert("Story restored from original file.");
  location.reload();
};
  refreshSceneList();

}
