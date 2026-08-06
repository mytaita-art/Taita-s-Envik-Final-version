"use strict";

const gates = [
  {
    name: "Enchanted Forest",
    icon: "🌲",
    x: 9,
    y: 77.9,
    parts: ["Tom", "plays", "football", "every Saturday."]
  },
  {
    name: "Moon Bridge",
    icon: "🌙",
    x: 18.5,
    y: 59.3,
    parts: ["She", "is reading", "a book", "now."]
  },
  {
    name: "Crystal Meadow",
    icon: "💠",
    x: 30,
    y: 69.8,
    parts: ["There are", "two chairs", "near", "the window."]
  },
  {
    name: "Whispering Trees",
    icon: "🌳",
    x: 40,
    y: 47.7,
    parts: ["My sister", "can", "speak", "French."]
  },
  {
    name: "Magic Tower",
    icon: "🔮",
    x: 50,
    y: 60.5,
    parts: ["We", "didn't go", "to school", "yesterday."]
  },
  {
    name: "Dragon Hill",
    icon: "🐉",
    x: 60,
    y: 40.7,
    parts: ["Has", "he", "got", "a new bike", "?"]
  },
  {
    name: "Star Lake",
    icon: "🌟",
    x: 70,
    y: 51.2,
    parts: ["We", "usually", "have", "dinner", "at seven o'clock."]
  },
  {
    name: "Ancient Gate",
    icon: "🗝️",
    x: 79,
    y: 31.4,
    parts: ["The cat", "is", "under", "the table."]
  },
  {
    name: "Castle Bridge",
    icon: "🌉",
    x: 87.5,
    y: 40.7,
    parts: ["My brother", "doesn't like", "rainy weather."]
  },
  {
    name: "Royal Castle",
    icon: "🏰",
    x: 94,
    y: 18.6,
    parts: ["Where", "do", "they go", "on Sundays", "?"]
  }
];

const elements = {
  lives: document.getElementById("livesDisplay"),
  crystalCount: document.getElementById("crystalCount"),
  score: document.getElementById("scoreDisplay"),
  gateNumber: document.getElementById("gateNumber"),
  crystalStatus: document.querySelector(".crystal-status"),
  routeNodes: document.getElementById("routeNodes"),
  routeProgress: document.getElementById("routeProgress"),
  player: document.getElementById("playerToken"),
  locationIcon: document.getElementById("locationIcon"),
  locationName: document.getElementById("locationName"),
  gatePanel: document.getElementById("gatePanel"),
  gateLabel: document.getElementById("gateLabel"),
  checkpointName: document.getElementById("checkpointName"),
  gateLock: document.getElementById("gateLock"),
  wordBank: document.getElementById("wordBank"),
  spellLine: document.getElementById("spellLine"),
  spellPlaceholder: document.getElementById("spellPlaceholder"),
  feedback: document.getElementById("spellFeedback"),
  feedbackSymbol: document.getElementById("feedbackSymbol"),
  feedbackText: document.getElementById("feedbackText"),
  resetButton: document.getElementById("resetButton"),
  openGateButton: document.getElementById("openGateButton"),
  soundButton: document.getElementById("soundButton"),
  soundIcon: document.getElementById("soundIcon"),
  soundLabel: document.getElementById("soundLabel"),
  instructionsButton: document.getElementById("instructionsButton"),
  instructionsModal: document.getElementById("instructionsModal"),
  closeInstructions: document.getElementById("closeInstructions"),
  startAdventureButton: document.getElementById("startAdventureButton"),
  endScreen: document.getElementById("endScreen"),
  endCard: document.getElementById("endCard"),
  endEmblem: document.getElementById("endEmblem"),
  endKicker: document.getElementById("endKicker"),
  endTitle: document.getElementById("endTitle"),
  endMessage: document.getElementById("endMessage"),
  performanceTitle: document.getElementById("performanceTitle"),
  finalCrystals: document.getElementById("finalCrystals"),
  finalScore: document.getElementById("finalScore"),
  finalLives: document.getElementById("finalLives"),
  restartButton: document.getElementById("restartButton")
};

const sounds = {
  click: new Audio("../../sounds/click.mp3"),
  correct: new Audio("../../sounds/correct.mp3"),
  wrong: new Audio("../../sounds/wrong.mp3"),
  win: new Audio("../../sounds/win.mp3")
};

sounds.click.volume = 0.5;
sounds.correct.volume = 0.72;
sounds.wrong.volume = 0.66;
sounds.win.volume = 0.78;

let currentGate = 0;
let lives = 3;
let crystals = 0;
let score = 0;
let failedAttempts = 0;
let soundEnabled = true;
let transitionLocked = false;
let currentScramble = [];
let activeDrag = null;
let lastModalTrigger = null;

function playSound(name) {
  if (!soundEnabled || !sounds[name]) {
    return;
  }

  const sound = sounds[name];
  sound.pause();
  sound.currentTime = 0;
  const playPromise = sound.play();

  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {});
  }
}

function shuffleIndexes(length) {
  const indexes = Array.from({ length }, (_, index) => index);

  for (let index = indexes.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [indexes[index], indexes[randomIndex]] = [indexes[randomIndex], indexes[index]];
  }

  const isCorrectOrder = indexes.every((value, index) => value === index);
  if (isCorrectOrder && indexes.length > 1) {
    indexes.push(indexes.shift());
  }

  return indexes;
}

function buildRouteNodes(activeIndex = currentGate) {
  elements.routeNodes.innerHTML = "";

  gates.forEach((gate, index) => {
    const node = document.createElement("div");
    const isCompleted = index < crystals;
    const isCurrent = index === activeIndex && !isCompleted;
    node.className = "checkpoint-node";
    node.style.setProperty("--x", `${gate.x}%`);
    node.style.setProperty("--y", `${gate.y}%`);
    node.dataset.gate = String(index);

    if (isCompleted) {
      node.classList.add("completed");
    } else if (isCurrent) {
      node.classList.add("current");
    } else {
      node.classList.add("future");
    }

    const icon = document.createElement("span");
    icon.className = "node-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = isCompleted ? "💎" : isCurrent ? gate.icon : "🔒";

    const name = document.createElement("span");
    name.className = "node-name";
    name.textContent = `${index + 1}. ${gate.name}`;

    node.append(icon, name);
    elements.routeNodes.append(node);
  });
}

function movePlayerTo(index, animate = true) {
  const destination = gates[Math.max(0, Math.min(index, gates.length - 1))];
  if (!animate) {
    elements.player.style.transition = "none";
  }

  elements.player.style.setProperty("--player-x", `${destination.x}%`);
  elements.player.style.setProperty("--player-y", `${destination.y}%`);

  if (!animate) {
    requestAnimationFrame(() => {
      elements.player.style.removeProperty("transition");
    });
  }
}

function updateRoute(destinationIndex = currentGate) {
  const progress = destinationIndex / (gates.length - 1);
  elements.routeProgress.style.strokeDashoffset = String(1 - progress);
}

function renderLives(lostIndex = -1) {
  elements.lives.innerHTML = "";

  for (let index = 0; index < 3; index += 1) {
    const heart = document.createElement("span");
    const isEmpty = index >= lives;
    heart.className = `heart${isEmpty ? " empty" : ""}${index === lostIndex ? " lost" : ""}`;
    heart.textContent = isEmpty ? "♡" : "♥";
    heart.setAttribute("aria-hidden", "true");
    elements.lives.append(heart);
  }

  elements.lives.setAttribute("aria-label", `${lives} ${lives === 1 ? "life" : "lives"} remaining`);
}

function updateStatus(lostHeartIndex = -1) {
  renderLives(lostHeartIndex);
  elements.crystalCount.textContent = String(crystals);
  elements.score.textContent = String(score);
  elements.gateNumber.textContent = String(Math.min(currentGate + 1, gates.length));
}

function createWordTile(part, order) {
  const tile = document.createElement("button");
  tile.type = "button";
  tile.className = "word-tile";
  tile.dataset.order = String(order);
  tile.textContent = part;
  tile.setAttribute("aria-label", `${part}. Drag or press Enter to move this tile.`);
  tile.addEventListener("pointerdown", startTileDrag);
  tile.addEventListener("keydown", handleTileKeydown);
  return tile;
}

function clearTiles() {
  elements.wordBank.querySelectorAll(".word-tile").forEach((tile) => tile.remove());
  elements.spellLine.querySelectorAll(".word-tile").forEach((tile) => tile.remove());
}

function setFeedback(type, message) {
  elements.feedback.classList.remove("success", "failure");
  if (type) {
    elements.feedback.classList.add(type);
  }
  elements.feedbackSymbol.textContent = type === "success" ? "💎" : type === "failure" ? "✕" : "✧";
  elements.feedbackText.textContent = message;
}

function updateTileZones() {
  const spellTiles = elements.spellLine.querySelectorAll(".word-tile");
  const requiredTiles = gates[currentGate].parts.length;
  elements.spellLine.classList.toggle("has-tiles", spellTiles.length > 0);
  elements.openGateButton.disabled = transitionLocked || spellTiles.length !== requiredTiles;
  elements.resetButton.disabled = transitionLocked;
}

function loadGate() {
  const gate = gates[currentGate];
  transitionLocked = false;
  failedAttempts = 0;
  elements.gatePanel.classList.remove("gate-success", "gate-fail");
  elements.gateLock.textContent = "🔒";
  elements.gateLabel.textContent = `Magical Gate ${currentGate + 1}`;
  elements.checkpointName.textContent = gate.name;
  elements.locationIcon.textContent = gate.icon;
  elements.locationName.textContent = gate.name;
  currentScramble = shuffleIndexes(gate.parts.length);

  clearTiles();
  currentScramble.forEach((order) => {
    elements.wordBank.append(createWordTile(gate.parts[order], order));
  });

  setFeedback("", "The gate is waiting for your spell.");
  buildRouteNodes(currentGate);
  movePlayerTo(currentGate, false);
  updateRoute(currentGate);
  updateStatus();
  updateTileZones();
}

function resetTiles() {
  if (transitionLocked) {
    return;
  }

  cancelActiveDrag();
  const allTiles = [
    ...elements.wordBank.querySelectorAll(".word-tile"),
    ...elements.spellLine.querySelectorAll(".word-tile")
  ];

  const tilesByOrder = new Map(allTiles.map((tile) => [Number(tile.dataset.order), tile]));
  currentScramble.forEach((order) => {
    elements.wordBank.append(tilesByOrder.get(order));
  });

  allTiles.forEach((tile) => tile.classList.remove("wrong-tile", "correct-tile"));
  setFeedback("", "The tiles have returned to the Word Bank.");
  updateTileZones();
  playSound("click");
}

function isSpellCorrect() {
  const arrangedOrder = [...elements.spellLine.querySelectorAll(".word-tile")]
    .map((tile) => Number(tile.dataset.order));

  return arrangedOrder.length === gates[currentGate].parts.length
    && arrangedOrder.every((order, index) => order === index);
}

function pointsForAttempt() {
  if (failedAttempts === 0) {
    return 100;
  }
  if (failedAttempts === 1) {
    return 75;
  }
  return 50;
}

function openGate() {
  if (transitionLocked || elements.openGateButton.disabled) {
    return;
  }

  cancelActiveDrag();
  transitionLocked = true;
  updateTileZones();

  if (isSpellCorrect()) {
    handleCorrectSpell();
  } else {
    handleWrongSpell();
  }
}

function handleCorrectSpell() {
  const earnedPoints = pointsForAttempt();
  score += earnedPoints;
  crystals += 1;
  playSound("correct");

  elements.gatePanel.classList.add("gate-success");
  elements.gateLock.textContent = "🔓";
  elements.spellLine.querySelectorAll(".word-tile").forEach((tile) => {
    tile.classList.remove("wrong-tile");
    tile.classList.add("correct-tile");
  });
  setFeedback("success", `The gate is open! Crystal collected · +${earnedPoints} points`);

  elements.crystalStatus.classList.remove("crystal-pop");
  void elements.crystalStatus.offsetWidth;
  elements.crystalStatus.classList.add("crystal-pop");
  updateStatus();

  const completedGate = currentGate;
  const destination = Math.min(completedGate + 1, gates.length - 1);
  buildRouteNodes(destination);
  updateRoute(destination);
  elements.player.classList.add("moving");
  movePlayerTo(destination, true);

  window.setTimeout(() => {
    elements.player.classList.remove("moving");

    if (completedGate === gates.length - 1) {
      showVictory();
      return;
    }

    currentGate = completedGate + 1;
    loadGate();
  }, 1350);
}

function handleWrongSpell() {
  failedAttempts += 1;
  lives = Math.max(0, lives - 1);
  playSound("wrong");

  elements.gatePanel.classList.remove("gate-fail");
  void elements.gatePanel.offsetWidth;
  elements.gatePanel.classList.add("gate-fail");
  elements.spellLine.querySelectorAll(".word-tile").forEach((tile) => {
    tile.classList.add("wrong-tile");
  });
  setFeedback("failure", "The spell didn't work. Try again!");
  updateStatus(lives);

  window.setTimeout(() => {
    elements.gatePanel.classList.remove("gate-fail");
    elements.spellLine.querySelectorAll(".word-tile").forEach((tile) => {
      tile.classList.remove("wrong-tile");
    });

    if (lives === 0) {
      showGameOver();
    } else {
      transitionLocked = false;
      updateTileZones();
    }
  }, 800);
}

function showVictory() {
  playSound("win");
  elements.endCard.classList.remove("game-over");
  elements.endEmblem.textContent = "🏰";
  elements.endKicker.textContent = "Adventure Complete";
  elements.endTitle.textContent = "Castle Unlocked!";
  elements.endMessage.textContent = "You completed the Grammar Quest.";

  if (score === 1000 && lives === 3) {
    elements.performanceTitle.textContent = "Perfect Spellcaster";
  } else if (score >= 850) {
    elements.performanceTitle.textContent = "Brilliant Explorer";
  } else {
    elements.performanceTitle.textContent = "Grammar Adventurer";
  }

  elements.finalCrystals.textContent = `${crystals} / ${gates.length}`;
  elements.finalScore.textContent = String(score);
  elements.finalLives.textContent = String(lives);
  elements.restartButton.textContent = "↻ Play Again";
  elements.endScreen.hidden = false;
  elements.restartButton.focus();
}

function showGameOver() {
  elements.endCard.classList.add("game-over");
  elements.endEmblem.textContent = "✨";
  elements.endKicker.textContent = "Adventure Paused";
  elements.endTitle.textContent = "The Magic Has Faded...";
  elements.endMessage.textContent = `You reached Gate ${currentGate + 1}. Try the adventure again and reach the castle!`;
  elements.performanceTitle.textContent = "The enchanted road still awaits you.";
  elements.finalCrystals.textContent = `${crystals} / ${gates.length}`;
  elements.finalScore.textContent = String(score);
  elements.finalLives.textContent = "0";
  elements.restartButton.textContent = "↻ Try Again";
  elements.endScreen.hidden = false;
  elements.restartButton.focus();
}

function restartAdventure() {
  playSound("click");
  cancelActiveDrag();
  currentGate = 0;
  lives = 3;
  crystals = 0;
  score = 0;
  failedAttempts = 0;
  transitionLocked = false;
  elements.endScreen.hidden = true;
  elements.crystalStatus.classList.remove("crystal-pop");
  loadGate();
}

/* Pointer Events drag-and-drop: shared by mouse, pen and touch. */
function startTileDrag(event) {
  if (transitionLocked || activeDrag) {
    return;
  }
  if (event.pointerType === "mouse" && event.button !== 0) {
    return;
  }

  event.preventDefault();
  const tile = event.currentTarget;
  const sourceZone = tile.closest(".tile-zone");
  const rectangle = tile.getBoundingClientRect();
  const placeholder = document.createElement("span");
  placeholder.className = "tile-placeholder";
  placeholder.style.width = `${rectangle.width}px`;
  placeholder.style.height = `${rectangle.height}px`;
  placeholder.setAttribute("aria-hidden", "true");

  sourceZone.insertBefore(placeholder, tile);
  document.body.append(tile);
  tile.classList.add("is-dragging");
  tile.style.position = "fixed";
  tile.style.left = `${rectangle.left}px`;
  tile.style.top = `${rectangle.top}px`;
  tile.style.width = `${rectangle.width}px`;
  tile.style.height = `${rectangle.height}px`;
  tile.style.margin = "0";

  activeDrag = {
    pointerId: event.pointerId,
    tile,
    placeholder,
    sourceZone,
    offsetX: event.clientX - rectangle.left,
    offsetY: event.clientY - rectangle.top,
    startX: event.clientX,
    startY: event.clientY,
    moved: false
  };

  sourceZone.classList.add("drag-target");
  playSound("click");
}

function moveActiveTile(event) {
  if (!activeDrag || event.pointerId !== activeDrag.pointerId) {
    return;
  }

  event.preventDefault();
  const drag = activeDrag;
  if (Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 6) {
    drag.moved = true;
  }

  drag.tile.style.left = `${event.clientX - drag.offsetX}px`;
  drag.tile.style.top = `${event.clientY - drag.offsetY}px`;

  const hoveredElement = document.elementFromPoint(event.clientX, event.clientY);
  const hoveredZone = hoveredElement ? hoveredElement.closest(".tile-zone") : null;
  document.querySelectorAll(".tile-zone").forEach((zone) => zone.classList.remove("drag-target"));

  if (!hoveredZone) {
    return;
  }

  hoveredZone.classList.add("drag-target");
  const insertionReference = findInsertionReference(hoveredZone, event.clientX, event.clientY);
  hoveredZone.insertBefore(drag.placeholder, insertionReference);
}

function findInsertionReference(zone, pointerX, pointerY) {
  const tiles = [...zone.querySelectorAll(".word-tile:not(.is-dragging)")];

  for (let index = 0; index < tiles.length; index += 1) {
    const tile = tiles[index];
    const rectangle = tile.getBoundingClientRect();
    const nextTile = tiles[index + 1];

    if (pointerY <= rectangle.bottom) {
      if (pointerY < rectangle.top || pointerX < rectangle.left + rectangle.width / 2) {
        return tile;
      }

      if (!nextTile) {
        return null;
      }

      const nextRectangle = nextTile.getBoundingClientRect();
      if (nextRectangle.top > rectangle.top + rectangle.height / 2) {
        return nextTile;
      }
    }
  }

  return null;
}

function finishTileDrag(event) {
  if (!activeDrag || event.pointerId !== activeDrag.pointerId) {
    return;
  }
  event.preventDefault();
  completeActiveDrag(false);
}

function cancelTileDrag(event) {
  if (!activeDrag || event.pointerId !== activeDrag.pointerId) {
    return;
  }
  completeActiveDrag(true);
}

function completeActiveDrag(cancelled) {
  if (!activeDrag) {
    return;
  }

  const drag = activeDrag;
  document.querySelectorAll(".tile-zone").forEach((zone) => zone.classList.remove("drag-target"));

  if (cancelled) {
    drag.placeholder.replaceWith(drag.tile);
  } else if (!drag.moved) {
    drag.placeholder.remove();
    const targetZone = drag.sourceZone === elements.wordBank ? elements.spellLine : elements.wordBank;
    targetZone.append(drag.tile);
  } else {
    drag.placeholder.replaceWith(drag.tile);
  }

  drag.tile.classList.remove("is-dragging");
  ["position", "left", "top", "width", "height", "margin"].forEach((property) => {
    drag.tile.style.removeProperty(property);
  });

  activeDrag = null;
  updateTileZones();
}

function cancelActiveDrag() {
  completeActiveDrag(true);
}

function handleTileKeydown(event) {
  if (transitionLocked) {
    return;
  }

  const tile = event.currentTarget;
  const zone = tile.closest(".tile-zone");

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    const targetZone = zone === elements.wordBank ? elements.spellLine : elements.wordBank;
    targetZone.append(tile);
    playSound("click");
    updateTileZones();
    tile.focus();
    return;
  }

  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
    return;
  }

  event.preventDefault();
  const tiles = [...zone.querySelectorAll(".word-tile")];
  const index = tiles.indexOf(tile);
  const direction = event.key === "ArrowLeft" ? -1 : 1;
  const newIndex = Math.max(0, Math.min(tiles.length - 1, index + direction));

  if (newIndex === index) {
    return;
  }

  if (direction < 0) {
    zone.insertBefore(tile, tiles[newIndex]);
  } else {
    zone.insertBefore(tile, tiles[newIndex].nextSibling);
  }
  playSound("click");
  tile.focus();
}

function openInstructions(trigger) {
  lastModalTrigger = trigger || document.activeElement;
  elements.instructionsModal.hidden = false;
  elements.instructionsModal.setAttribute("aria-hidden", "false");
  elements.startAdventureButton.focus();
}

function closeInstructions() {
  elements.instructionsModal.hidden = true;
  elements.instructionsModal.setAttribute("aria-hidden", "true");
  if (lastModalTrigger && typeof lastModalTrigger.focus === "function") {
    lastModalTrigger.focus();
  }
}

function toggleSound() {
  if (soundEnabled) {
    playSound("click");
    soundEnabled = false;
  } else {
    soundEnabled = true;
    playSound("click");
  }

  elements.soundButton.setAttribute("aria-pressed", String(soundEnabled));
  elements.soundIcon.textContent = soundEnabled ? "🔊" : "🔇";
  elements.soundLabel.textContent = soundEnabled ? "Sound ON" : "Sound OFF";
}

elements.resetButton.addEventListener("click", resetTiles);
elements.openGateButton.addEventListener("click", openGate);
elements.restartButton.addEventListener("click", restartAdventure);
elements.soundButton.addEventListener("click", toggleSound);

elements.instructionsButton.addEventListener("click", () => {
  playSound("click");
  openInstructions(elements.instructionsButton);
});

elements.closeInstructions.addEventListener("click", () => {
  playSound("click");
  closeInstructions();
});

elements.startAdventureButton.addEventListener("click", () => {
  playSound("click");
  closeInstructions();
});

elements.instructionsModal.addEventListener("pointerdown", (event) => {
  if (event.target === elements.instructionsModal) {
    closeInstructions();
  }
});

document.addEventListener("pointermove", moveActiveTile, { passive: false });
document.addEventListener("pointerup", finishTileDrag, { passive: false });
document.addEventListener("pointercancel", cancelTileDrag);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.instructionsModal.hidden) {
    closeInstructions();
  }
});

loadGate();
