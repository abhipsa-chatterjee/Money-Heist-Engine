export let state = {
  money: 100,
  policeAlert: 0,
  teamTrust: 5,
  skill: "none",
  publicOpinion: 0,
  insiderTrust: 0,
  fear: 0,
  stealth: 0,
  teamAlive: 3,
  info: 0,
  deception: 0,
  chaos: 0,
  time: 0,
  noise: 0
};

export let storyData = null;

export function loadStory(data) {
  storyData = data;
}

export function checkConditions(conditions = {}) {
  for (let key in conditions) {
    const rule = conditions[key];
    const val = state[key];

    if (typeof rule === "object") {
      if (rule.gte !== undefined && val < rule.gte) return false;
      if (rule.eq !== undefined && val !== rule.eq) return false;
    } else {
      if (val !== rule) return false;
    }
  }
  return true;
}

export function applyEffects(effects) {
  if (!effects) return;
  for (let k in effects) {
    if (typeof effects[k] === "number") {
      state[k] = (state[k] || 0) + effects[k];
    } else {
      state[k] = effects[k];
    }
  }
}

export function getScene(id) {
  return storyData.scenes.find(s => s.id === id);
}

export function getEnding() {
  return (
    storyData.endings.find(e => checkConditions(e.conditions || {})) ||
    storyData.endings[storyData.endings.length - 1]
  );
}