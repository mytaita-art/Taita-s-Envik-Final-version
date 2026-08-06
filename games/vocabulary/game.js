"use strict";

const locations = [
  {
    name: "Enchanted Garden",
    shortName: "Garden",
    icon: "🌿",
    className: "scene-garden",
    targets: ["umbrella", "basket", "key"],
    decorations: [
      { icon: "🌳", x: 7, y: 42, size: 112, rotate: -3, opacity: 0.72 },
      { icon: "🌿", x: 93, y: 66, size: 92, rotate: 7, opacity: 0.7 },
      { icon: "🪷", x: 53, y: 89, size: 54, rotate: 0, opacity: 0.65 }
    ],
    objects: [
      { id: "umbrella", word: "Umbrella", icon: "☂️", clue: "Find something you use when it rains.", x: 16, y: 27, size: 49, rotate: -12, depth: 4 },
      { id: "basket", word: "Basket", icon: "🧺", clue: "Find something you can carry fruit in.", x: 67, y: 76, size: 48, rotate: 4, depth: 5 },
      { id: "key", word: "Key", icon: "🗝️", clue: "Find something that can open a door.", x: 84, y: 33, size: 39, rotate: 24, depth: 4 },
      { id: "bench", word: "Bench", icon: "🪑", x: 43, y: 61, size: 55, rotate: 0, depth: 3 },
      { id: "flower", word: "Flower", icon: "🌸", x: 61, y: 29, size: 36, rotate: -8, depth: 4 },
      { id: "book", word: "Book", icon: "📕", x: 35, y: 84, size: 39, rotate: 11, depth: 5 },
      { id: "ball", word: "Ball", icon: "⚽", x: 78, y: 89, size: 38, rotate: -7, depth: 6 },
      { id: "bottle", word: "Bottle", icon: "🧴", x: 11, y: 56, size: 40, rotate: 5, depth: 5 },
      { id: "hat", word: "Hat", icon: "👒", x: 91, y: 68, size: 45, rotate: 9, depth: 5 }
    ]
  },
  {
    name: "Explorer's Camp",
    shortName: "Camp",
    icon: "⛺",
    className: "scene-camp",
    targets: ["map", "backpack", "torch"],
    decorations: [
      { icon: "⛺", x: 50, y: 50, size: 112, rotate: 0, opacity: 0.78 },
      { icon: "🌲", x: 7, y: 38, size: 118, rotate: -2, opacity: 0.69 },
      { icon: "🪵", x: 56, y: 79, size: 58, rotate: 4, opacity: 0.7 }
    ],
    objects: [
      { id: "map", word: "Map", icon: "🗺️", clue: "Find something that shows you where to go.", x: 18, y: 29, size: 48, rotate: -7, depth: 5 },
      { id: "backpack", word: "Backpack", icon: "🎒", clue: "Find something you carry on your back.", x: 68, y: 82, size: 52, rotate: 5, depth: 6 },
      { id: "torch", word: "Torch", icon: "🔦", clue: "Find something that helps you see in the dark.", x: 88, y: 33, size: 45, rotate: -18, depth: 5 },
      { id: "camp-tent", word: "Tent", icon: "⛺", x: 50, y: 49, size: 74, rotate: 0, depth: 3 },
      { id: "boots", word: "Boots", icon: "🥾", x: 17, y: 84, size: 48, rotate: 8, depth: 5 },
      { id: "camera", word: "Camera", icon: "📷", x: 78, y: 52, size: 43, rotate: 5, depth: 4 },
      { id: "camp-bottle", word: "Bottle", icon: "🧴", x: 30, y: 62, size: 38, rotate: -4, depth: 5 },
      { id: "rope", word: "Rope", icon: "🪢", x: 47, y: 88, size: 43, rotate: 7, depth: 6 },
      { id: "camp-cup", word: "Cup", icon: "☕", x: 60, y: 68, size: 38, rotate: -8, depth: 5 }
    ]
  },
  {
    name: "Magic Market",
    shortName: "Market",
    icon: "🛍️",
    className: "scene-market",
    targets: ["scarf", "wallet", "clock"],
    decorations: [
      { icon: "🎪", x: 23, y: 36, size: 112, rotate: -2, opacity: 0.63 },
      { icon: "🏮", x: 78, y: 27, size: 64, rotate: 4, opacity: 0.7 },
      { icon: "🧺", x: 50, y: 88, size: 60, rotate: 1, opacity: 0.58 }
    ],
    objects: [
      { id: "scarf", word: "Scarf", icon: "🧣", clue: "Find something you wear around your neck.", x: 14, y: 35, size: 49, rotate: -8, depth: 5 },
      { id: "wallet", word: "Wallet", icon: "👛", clue: "Find something where people keep money and cards.", x: 72, y: 78, size: 46, rotate: 8, depth: 6 },
      { id: "clock", word: "Clock", icon: "🕰️", clue: "Find something that tells you the time.", x: 88, y: 25, size: 49, rotate: 0, depth: 4 },
      { id: "apple", word: "Apple", icon: "🍎", x: 48, y: 58, size: 37, rotate: -4, depth: 5 },
      { id: "market-bottle", word: "Bottle", icon: "🧴", x: 13, y: 82, size: 40, rotate: 5, depth: 6 },
      { id: "bag", word: "Bag", icon: "🛍️", x: 57, y: 86, size: 48, rotate: -3, depth: 5 },
      { id: "market-glasses", word: "Glasses", icon: "👓", x: 72, y: 47, size: 43, rotate: 9, depth: 5 },
      { id: "market-cup", word: "Cup", icon: "☕", x: 34, y: 79, size: 38, rotate: -8, depth: 6 },
      { id: "market-umbrella", word: "Umbrella", icon: "☂️", x: 92, y: 69, size: 47, rotate: 12, depth: 5 }
    ]
  },
  {
    name: "Secret Library",
    shortName: "Library",
    icon: "📚",
    className: "scene-library",
    targets: ["dictionary", "globe", "lamp"],
    decorations: [
      { icon: "📚", x: 9, y: 45, size: 98, rotate: -3, opacity: 0.72 },
      { icon: "🪟", x: 52, y: 29, size: 100, rotate: 0, opacity: 0.46 },
      { icon: "📚", x: 91, y: 56, size: 106, rotate: 3, opacity: 0.7 }
    ],
    objects: [
      { id: "dictionary", word: "Dictionary", icon: "📖", clue: "Find a book that helps you understand new words.", x: 20, y: 29, size: 50, rotate: -6, depth: 5 },
      { id: "globe", word: "Globe", icon: "🌍", clue: "Find something that shows the world.", x: 71, y: 40, size: 52, rotate: 2, depth: 4 },
      { id: "lamp", word: "Lamp", icon: "🪔", clue: "Find something that gives you light.", x: 88, y: 78, size: 47, rotate: 5, depth: 6 },
      { id: "notebook", word: "Notebook", icon: "📓", x: 46, y: 82, size: 43, rotate: 11, depth: 6 },
      { id: "pencil", word: "Pencil", icon: "✏️", x: 56, y: 61, size: 41, rotate: -23, depth: 5 },
      { id: "library-clock", word: "Clock", icon: "🕰️", x: 47, y: 33, size: 47, rotate: 0, depth: 4 },
      { id: "chair", word: "Chair", icon: "🪑", x: 14, y: 78, size: 52, rotate: -4, depth: 6 },
      { id: "library-key", word: "Key", icon: "🗝️", x: 88, y: 29, size: 38, rotate: 19, depth: 5 },
      { id: "library-glasses", word: "Glasses", icon: "👓", x: 70, y: 86, size: 42, rotate: -7, depth: 6 }
    ]
  }
];

const collectionObjects = locations.flatMap((location) =>
  location.targets.map((targetId) => location.objects.find((object) => object.id === targetId))
);

const elements = {
  lives: document.getElementById("livesDisplay"),
  score: document.getElementById("scoreDisplay"),
  comboItem: document.getElementById("comboItem"),
  combo: document.getElementById("comboDisplay"),
  found: document.getElementById("foundDisplay"),
  locationProgress: document.getElementById("locationProgress"),
  locationNumber: document.getElementById("locationNumber"),
  locationTitle: document.getElementById("locationTitle"),
  locationFound: document.getElementById("locationFound"),
  sceneFrame: document.getElementById("sceneFrame"),
  sceneDecor: document.getElementById("sceneDecor"),
  objectLayer: document.getElementById("objectLayer"),
  searchLens: document.getElementById("searchLens"),
  sceneMessage: document.getElementById("sceneMessage"),
  discoveryBanner: document.getElementById("discoveryBanner"),
  discoveryIcon: document.getElementById("discoveryIcon"),
  discoveryWord: document.getElementById("discoveryWord"),
  locationComplete: document.getElementById("locationComplete"),
  completeBadge: document.getElementById("completeBadge"),
  completeTitle: document.getElementById("completeTitle"),
  continueButton: document.getElementById("continueButton"),
  clueText: document.getElementById("clueText"),
  mascot: document.getElementById("mascot"),
  hintButton: document.getElementById("hintButton"),
  hintCount: document.getElementById("hintCount"),
  collectionGrid: document.getElementById("collectionGrid"),
  instructionsButton: document.getElementById("instructionsButton"),
  instructionsModal: document.getElementById("instructionsModal"),
  closeInstructions: document.getElementById("closeInstructions"),
  startHuntButton: document.getElementById("startHuntButton"),
  soundButton: document.getElementById("soundButton"),
  soundIcon: document.getElementById("soundIcon"),
  soundLabel: document.getElementById("soundLabel"),
  endScreen: document.getElementById("endScreen"),
  endCard: document.getElementById("endCard"),
  endEmblem: document.getElementById("endEmblem"),
  endKicker: document.getElementById("endKicker"),
  endTitle: document.getElementById("endTitle"),
  endMessage: document.getElementById("endMessage"),
  rankTitle: document.getElementById("rankTitle"),
  finalFound: document.getElementById("finalFound"),
  finalScore: document.getElementById("finalScore"),
  finalCombo: document.getElementById("finalCombo"),
  finalHints: document.getElementById("finalHints"),
  restartButton: document.getElementById("restartButton")
};

const sounds = {
  click: new Audio("../../sounds/click.mp3"),
  correct: new Audio("../../sounds/correct.mp3"),
  wrong: new Audio("../../sounds/wrong.mp3"),
  win: new Audio("../../sounds/win.mp3")
};

sounds.click.volume = 0.48;
sounds.correct.volume = 0.72;
sounds.wrong.volume = 0.65;
sounds.win.volume = 0.78;

const state = {
  locationIndex: 0,
  clueIndex: 0,
  lives: 3,
  score: 0,
  streak: 0,
  bestCombo: 1,
  hints: 3,
  found: new Set(),
  started: true,
  modalOpen: false,
  transition: false,
  discoveryLocked: false,
  ended: false,
  soundEnabled: true
};

let messageTimer = null;
let discoveryTimer = null;
let hintTimer = null;
let lastModalTrigger = null;

function playSound(name) {
  if (!state.soundEnabled || !sounds[name]) {
    return;
  }

  const sound = sounds[name];
  sound.pause();
  sound.currentTime = 0;
  const promise = sound.play();
  if (promise && typeof promise.catch === "function") {
    promise.catch(() => {});
  }
}

function currentLocation() {
  return locations[state.locationIndex];
}

function currentTarget() {
  const location = currentLocation();
  const targetId = location.targets[state.clueIndex];
  return location.objects.find((object) => object.id === targetId);
}

function comboMultiplier() {
  return Math.max(1, Math.min(state.streak, 3));
}

function renderLives(lostIndex = -1) {
  elements.lives.innerHTML = "";
  for (let index = 0; index < 3; index += 1) {
    const empty = index >= state.lives;
    const heart = document.createElement("span");
    heart.className = `heart${empty ? " empty" : ""}${index === lostIndex ? " lost" : ""}`;
    heart.textContent = empty ? "♡" : "♥";
    heart.setAttribute("aria-hidden", "true");
    elements.lives.append(heart);
  }
  elements.lives.setAttribute("aria-label", `${state.lives} ${state.lives === 1 ? "life" : "lives"} remaining`);
}

function updateHud(lostHeartIndex = -1, animateCombo = false) {
  renderLives(lostHeartIndex);
  elements.score.textContent = String(state.score);
  elements.combo.textContent = `x${comboMultiplier()}`;
  elements.found.textContent = String(state.found.size);
  elements.hintCount.textContent = String(state.hints);
  elements.hintButton.disabled = state.hints === 0 || state.ended || state.transition;

  if (animateCombo) {
    elements.comboItem.classList.remove("combo-pop");
    void elements.comboItem.offsetWidth;
    elements.comboItem.classList.add("combo-pop");
  }
}

function buildCollection() {
  elements.collectionGrid.innerHTML = "";
  collectionObjects.forEach((object) => {
    const slot = document.createElement("div");
    slot.className = "collection-slot";
    slot.dataset.objectId = object.id;
    slot.innerHTML = '<span class="slot-icon" aria-hidden="true">?</span><span class="slot-word">Lost word</span>';
    elements.collectionGrid.append(slot);
  });
}

function collectWord(object) {
  const slot = elements.collectionGrid.querySelector(`[data-object-id="${object.id}"]`);
  if (!slot) {
    return;
  }
  slot.classList.add("collected");
  slot.querySelector(".slot-icon").textContent = object.icon;
  slot.querySelector(".slot-word").textContent = object.word;
}

function renderLocationProgress(markCurrentComplete = false) {
  elements.locationProgress.innerHTML = "";
  locations.forEach((location, index) => {
    const completed = index < state.locationIndex || (index === state.locationIndex && markCurrentComplete);
    const current = index === state.locationIndex && !completed;
    const step = document.createElement("div");
    step.className = `location-step ${completed ? "completed" : current ? "current" : "future"}`;

    const icon = document.createElement("span");
    icon.className = "location-step-icon";
    icon.textContent = completed ? "✓" : current ? location.icon : "🔒";
    icon.setAttribute("aria-hidden", "true");

    const copy = document.createElement("span");
    const name = document.createElement("strong");
    const status = document.createElement("small");
    name.textContent = location.shortName;
    status.textContent = completed ? "Cleared" : current ? "Searching" : "Locked";
    copy.append(name, status);
    step.append(icon, copy);
    elements.locationProgress.append(step);
  });
}

function renderDecorations() {
  elements.sceneDecor.innerHTML = "";
  currentLocation().decorations.forEach((decoration) => {
    const prop = document.createElement("span");
    prop.className = "scene-prop";
    prop.textContent = decoration.icon;
    prop.style.setProperty("--x", `${decoration.x}%`);
    prop.style.setProperty("--y", `${decoration.y}%`);
    prop.style.setProperty("--size", String(decoration.size));
    prop.style.setProperty("--rotate", String(decoration.rotate || 0));
    prop.style.setProperty("--opacity", String(decoration.opacity || 0.7));
    elements.sceneDecor.append(prop);
  });
}

function createSceneObject(object) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "scene-object";
  button.dataset.objectId = object.id;
  button.style.setProperty("--x", `${object.x}%`);
  button.style.setProperty("--y", `${object.y}%`);
  button.style.setProperty("--size", String(object.size));
  button.style.setProperty("--rotate", String(object.rotate || 0));
  button.style.setProperty("--depth", String(object.depth || 3));
  button.style.setProperty("--flip", String(object.flip || 1));
  button.setAttribute("aria-label", "Interactive object in the scene");

  const icon = document.createElement("span");
  icon.className = "scene-object-icon";
  icon.textContent = object.icon;
  icon.setAttribute("aria-hidden", "true");
  button.append(icon);
  button.addEventListener("click", handleObjectSelection);
  return button;
}

function renderObjects() {
  elements.objectLayer.innerHTML = "";
  currentLocation().objects.forEach((object) => {
    if (!state.found.has(object.id)) {
      elements.objectLayer.append(createSceneObject(object));
    }
  });
}

function renderClue() {
  const target = currentTarget();
  elements.clueText.textContent = target ? target.clue : "All Lost Words in this location have been found.";
}

function countFoundInLocation(location) {
  return location.targets.filter((targetId) => state.found.has(targetId)).length;
}

function renderLocation() {
  const location = currentLocation();
  elements.locationNumber.textContent = `Location ${state.locationIndex + 1} of ${locations.length}`;
  elements.locationTitle.textContent = location.name;
  elements.locationFound.textContent = String(countFoundInLocation(location));

  locations.forEach((item) => elements.sceneFrame.classList.remove(item.className));
  elements.sceneFrame.classList.add(location.className);
  elements.sceneFrame.classList.remove("transitioning", "scene-enter");
  void elements.sceneFrame.offsetWidth;
  elements.sceneFrame.classList.add("scene-enter");

  renderLocationProgress(false);
  renderDecorations();
  renderObjects();
  renderClue();
  resetSearchLens();
  updateHud();
}

function moveSearchLens(event) {
  if (state.modalOpen || state.transition || state.ended) {
    return;
  }

  const frameRect = elements.sceneFrame.getBoundingClientRect();
  const x = Math.max(0, Math.min(frameRect.width, event.clientX - frameRect.left));
  const y = Math.max(0, Math.min(frameRect.height, event.clientY - frameRect.top));
  elements.searchLens.style.left = `${x}px`;
  elements.searchLens.style.top = `${y}px`;
  elements.searchLens.classList.add("visible");
  illuminateNearbyObjects(event.clientX, event.clientY);
}

function illuminateNearbyObjects(pointerX, pointerY) {
  const radius = elements.searchLens.offsetWidth * 0.62;
  elements.objectLayer.querySelectorAll(".scene-object").forEach((object) => {
    const rect = object.getBoundingClientRect();
    const centreX = rect.left + rect.width / 2;
    const centreY = rect.top + rect.height / 2;
    const distance = Math.hypot(pointerX - centreX, pointerY - centreY);
    object.classList.toggle("in-lens", distance <= radius);
  });
}

function resetSearchLens() {
  elements.searchLens.classList.remove("visible");
  elements.objectLayer.querySelectorAll(".scene-object").forEach((object) => {
    object.classList.remove("in-lens");
  });
}

function showSceneMessage(message, type = "") {
  window.clearTimeout(messageTimer);
  elements.sceneMessage.textContent = message;
  elements.sceneMessage.className = `scene-message show${type ? ` ${type}` : ""}`;
  messageTimer = window.setTimeout(() => {
    elements.sceneMessage.className = "scene-message";
  }, 1250);
}

function animateMascot(type) {
  elements.mascot.classList.remove("happy", "surprised");
  void elements.mascot.offsetWidth;
  elements.mascot.classList.add(type);
  window.setTimeout(() => elements.mascot.classList.remove(type), 720);
}

function showDiscovery(object) {
  window.clearTimeout(discoveryTimer);
  elements.discoveryBanner.hidden = true;
  elements.discoveryIcon.textContent = object.icon;
  elements.discoveryWord.textContent = object.word;
  void elements.discoveryBanner.offsetWidth;
  elements.discoveryBanner.hidden = false;
  discoveryTimer = window.setTimeout(() => {
    elements.discoveryBanner.hidden = true;
  }, 1120);
}

function handleObjectSelection(event) {
  if (!state.started || state.modalOpen || state.transition || state.discoveryLocked || state.ended) {
    return;
  }

  const button = event.currentTarget;
  const objectId = button.dataset.objectId;
  const target = currentTarget();

  if (target && objectId === target.id) {
    handleCorrectFind(button, target);
  } else {
    handleWrongFind(button);
  }
}

function handleCorrectFind(button, object) {
  state.discoveryLocked = true;
  state.streak += 1;
  const multiplier = comboMultiplier();
  const points = 100 * multiplier;
  state.bestCombo = Math.max(state.bestCombo, multiplier);
  state.score += points;
  state.found.add(object.id);
  state.clueIndex += 1;

  button.classList.remove("hinted");
  button.classList.add("discovered");
  playSound("correct");
  animateMascot("happy");
  showDiscovery(object);
  collectWord(object);
  elements.locationFound.textContent = String(countFoundInLocation(currentLocation()));
  updateHud(-1, multiplier > 1);

  if (multiplier > 1) {
    showSceneMessage(`Combo x${multiplier}! +${points} points`);
  }

  window.setTimeout(() => {
    button.remove();
    if (state.clueIndex >= currentLocation().targets.length) {
      completeLocation();
    } else {
      renderClue();
      state.discoveryLocked = false;
    }
  }, 920);
}

function handleWrongFind(button) {
  state.discoveryLocked = true;
  state.lives = Math.max(0, state.lives - 1);
  state.streak = 0;
  playSound("wrong");
  animateMascot("surprised");

  button.classList.remove("wrong-object");
  void button.offsetWidth;
  button.classList.add("wrong-object");
  showSceneMessage("Not this one!", "failure");
  updateHud(state.lives);

  const gameHasEnded = state.lives === 0;
  if (gameHasEnded) {
    state.transition = true;
  }

  window.setTimeout(() => {
    button.classList.remove("wrong-object");
    if (gameHasEnded) {
      showGameOver();
    } else {
      state.discoveryLocked = false;
    }
  }, 650);
}

function useHint() {
  if (!state.started || state.hints === 0 || state.modalOpen || state.transition || state.discoveryLocked || state.ended) {
    return;
  }

  const target = currentTarget();
  const targetButton = target
    ? elements.objectLayer.querySelector(`[data-object-id="${target.id}"]`)
    : null;

  if (!targetButton) {
    return;
  }

  state.hints -= 1;
  playSound("click");
  updateHud();
  showSceneMessage("A soft light reveals the right area…");
  targetButton.classList.add("hinted");
  window.clearTimeout(hintTimer);
  hintTimer = window.setTimeout(() => targetButton.classList.remove("hinted"), 2300);
}

function completeLocation() {
  state.discoveryLocked = true;
  state.transition = true;
  state.score += 250;
  updateHud();
  renderLocationProgress(true);

  const location = currentLocation();
  elements.completeBadge.textContent = location.icon;
  elements.completeTitle.textContent = `${location.name} Cleared!`;
  elements.continueButton.textContent = state.locationIndex === locations.length - 1
    ? "Open the Collection →"
    : "Continue the Hunt →";
  elements.sceneFrame.classList.add("transitioning");
  elements.locationComplete.hidden = false;
  elements.continueButton.focus();
}

function continueHunt() {
  if (!state.transition || state.ended) {
    return;
  }

  playSound("click");
  if (state.locationIndex === locations.length - 1) {
    showVictory();
    return;
  }

  state.locationIndex += 1;
  state.clueIndex = 0;
  state.transition = false;
  state.discoveryLocked = false;
  elements.locationComplete.hidden = true;
  renderLocation();
}

function fillEndStats() {
  elements.finalFound.textContent = `${state.found.size} / ${collectionObjects.length}`;
  elements.finalScore.textContent = String(state.score);
  elements.finalCombo.textContent = `x${state.bestCombo}`;
  elements.finalHints.textContent = String(state.hints);
}

function showVictory() {
  if (state.ended) {
    return;
  }
  state.ended = true;
  state.transition = false;
  playSound("win");

  elements.locationComplete.hidden = true;
  elements.endCard.classList.remove("game-over");
  elements.endEmblem.textContent = "🔎";
  elements.endKicker.textContent = "Collection Restored";
  elements.endTitle.textContent = "The Lost Words Are Found!";
  elements.endMessage.textContent = "You restored the Word Hunter Collection.";

  if (state.score >= 3800) {
    elements.rankTitle.textContent = "Master Word Hunter";
  } else if (state.score >= 3000) {
    elements.rankTitle.textContent = "Brilliant Detective";
  } else {
    elements.rankTitle.textContent = "Word Explorer";
  }

  elements.restartButton.textContent = "↻ Play Again";
  fillEndStats();
  elements.endScreen.hidden = false;
  elements.restartButton.focus();
}

function showGameOver() {
  if (state.ended) {
    return;
  }
  state.ended = true;
  state.transition = false;
  state.discoveryLocked = true;

  elements.endCard.classList.add("game-over");
  elements.endEmblem.textContent = "🌫️";
  elements.endKicker.textContent = "The Search Has Ended";
  elements.endTitle.textContent = "The Trail Has Gone Cold...";
  elements.endMessage.textContent = "The Lost Words are still hidden in the valley. Begin a new hunt and find them all!";
  elements.rankTitle.textContent = "A true hunter always tries again.";
  elements.restartButton.textContent = "↻ Hunt Again";
  fillEndStats();
  elements.endScreen.hidden = false;
  elements.restartButton.focus();
}

function resetGame() {
  window.clearTimeout(messageTimer);
  window.clearTimeout(discoveryTimer);
  window.clearTimeout(hintTimer);

  state.locationIndex = 0;
  state.clueIndex = 0;
  state.lives = 3;
  state.score = 0;
  state.streak = 0;
  state.bestCombo = 1;
  state.hints = 3;
  state.found = new Set();
  state.started = true;
  state.modalOpen = false;
  state.transition = false;
  state.discoveryLocked = false;
  state.ended = false;

  elements.endScreen.hidden = true;
  elements.locationComplete.hidden = true;
  elements.discoveryBanner.hidden = true;
  elements.sceneMessage.className = "scene-message";
  buildCollection();
  renderLocation();
  playSound("click");
}

function openInstructions(trigger) {
  lastModalTrigger = trigger || document.activeElement;
  state.modalOpen = true;
  elements.instructionsModal.hidden = false;
  elements.instructionsModal.setAttribute("aria-hidden", "false");
  elements.startHuntButton.focus();
}

function closeInstructions() {
  state.modalOpen = false;
  if (!state.started) {
    state.started = true;
  }
  elements.instructionsModal.hidden = true;
  elements.instructionsModal.setAttribute("aria-hidden", "true");
  if (lastModalTrigger && typeof lastModalTrigger.focus === "function") {
    lastModalTrigger.focus();
  }
}

function toggleSound() {
  if (state.soundEnabled) {
    playSound("click");
    state.soundEnabled = false;
  } else {
    state.soundEnabled = true;
    playSound("click");
  }
  elements.soundButton.setAttribute("aria-pressed", String(state.soundEnabled));
  elements.soundIcon.textContent = state.soundEnabled ? "🔊" : "🔇";
  elements.soundLabel.textContent = state.soundEnabled ? "Sound ON" : "Sound OFF";
}

elements.sceneFrame.addEventListener("click", (event) => {
  if (event.target.closest(".scene-object") || event.target.closest(".location-complete")) {
    return;
  }
  if (state.started && !state.modalOpen && !state.transition && !state.ended) {
    showSceneMessage("Keep searching… the Lost Word is somewhere in this scene.");
  }
});

elements.sceneFrame.addEventListener("pointerenter", moveSearchLens);
elements.sceneFrame.addEventListener("pointermove", moveSearchLens);
elements.sceneFrame.addEventListener("pointerdown", moveSearchLens);
elements.sceneFrame.addEventListener("pointerleave", (event) => {
  if (event.pointerType !== "touch") {
    resetSearchLens();
  }
});
elements.sceneFrame.addEventListener("pointerup", (event) => {
  if (event.pointerType === "touch") {
    window.setTimeout(resetSearchLens, 650);
  }
});

elements.hintButton.addEventListener("click", useHint);
elements.continueButton.addEventListener("click", continueHunt);
elements.restartButton.addEventListener("click", resetGame);
elements.soundButton.addEventListener("click", toggleSound);

elements.instructionsButton.addEventListener("click", () => {
  playSound("click");
  openInstructions(elements.instructionsButton);
});

elements.closeInstructions.addEventListener("click", () => {
  playSound("click");
  closeInstructions();
});

elements.startHuntButton.addEventListener("click", () => {
  playSound("click");
  closeInstructions();
});

elements.instructionsModal.addEventListener("pointerdown", (event) => {
  if (event.target === elements.instructionsModal) {
    closeInstructions();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.instructionsModal.hidden) {
    closeInstructions();
  }
});

buildCollection();
renderLocation();
