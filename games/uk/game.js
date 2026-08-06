"use strict";

const levels = [
  {
    country: "England",
    stamp: "🏰",
    pairs: [
      { id: "big-ben", name: "Big Ben", image: "../../images/uk-england-scene.png" },
      { id: "tower-bridge", name: "Tower Bridge", image: "../../images/uk-tower-bridge.png" },
      { id: "london-eye", name: "London Eye", image: "../../images/uk-london-eye.png" }
    ]
  },
  {
    country: "Scotland",
    stamp: "🏴",
    pairs: [
      { id: "edinburgh-castle", name: "Edinburgh Castle", image: "../../images/uk-edinburgh-castle.png" },
      { id: "bagpipes", name: "Bagpipes", image: "../../images/uk-bagpipes.png" },
      { id: "highlands", name: "Scottish Highlands", image: "../../images/uk-highlands.png" }
    ]
  },
  {
    country: "Wales",
    stamp: "🐉",
    pairs: [
      { id: "cardiff-castle", name: "Cardiff Castle", image: "../../images/uk-cardiff-castle.png" },
      { id: "red-dragon", name: "Red Dragon", image: "../../images/uk-red-dragon.png" },
      { id: "welsh-coast", name: "Welsh Coast", image: "../../images/uk-welsh-coast.png" }
    ]
  },
  {
    country: "Northern Ireland",
    stamp: "☘️",
    pairs: [
      { id: "giants-causeway", name: "Giant's Causeway", image: "../../images/uk-giant-causeway.png" },
      { id: "belfast", name: "Belfast", image: "../../images/uk-belfast.png" },
      { id: "causeway-coast", name: "Causeway Coast", image: "../../images/uk-causeway-coast.png" }
    ]
  }
];

const elements = {
  country: document.getElementById("countryDisplay"),
  stamps: document.getElementById("stampCount"),
  matches: document.getElementById("matchCount"),
  moves: document.getElementById("moveCount"),
  score: document.getElementById("scoreDisplay"),
  levelLabel: document.getElementById("levelLabel"),
  boardTitle: document.getElementById("boardTitle"),
  board: document.getElementById("memoryBoard"),
  stampList: document.getElementById("stampList"),
  levelOverlay: document.getElementById("levelOverlay"),
  stampReward: document.getElementById("stampReward"),
  levelTitle: document.getElementById("levelCompleteTitle"),
  stampMessage: document.getElementById("stampMessage"),
  levelMoves: document.getElementById("levelMoves"),
  nextLevel: document.getElementById("nextLevelButton"),
  finalOverlay: document.getElementById("finalOverlay"),
  finalScore: document.getElementById("finalScore"),
  totalMoves: document.getElementById("totalMoves"),
  rank: document.getElementById("rankTitle"),
  restart: document.getElementById("restartButton"),
  howModal: document.getElementById("howModal"),
  howButton: document.getElementById("howButton"),
  closeHow: document.getElementById("closeHow"),
  start: document.getElementById("startButton"),
  soundButton: document.getElementById("soundButton"),
  soundIcon: document.getElementById("soundIcon"),
  soundLabel: document.getElementById("soundLabel")
};

const sounds = {
  click: new Audio("../../sounds/click.mp3"),
  correct: new Audio("../../sounds/correct.mp3"),
  wrong: new Audio("../../sounds/wrong.mp3"),
  win: new Audio("../../sounds/win.mp3")
};
sounds.click.volume = 0.48;
sounds.correct.volume = 0.72;
sounds.wrong.volume = 0.32;
sounds.win.volume = 0.8;

let currentLevel = 0;
let firstCard = null;
let secondCard = null;
let boardLocked = false;
let matchedPairs = 0;
let levelMoves = 0;
let totalMoves = 0;
let score = 0;
let stamps = 0;
let previousAttemptMatched = false;
let soundEnabled = true;
let mismatchTimer = null;

function playSound(name) {
  if (!soundEnabled || !sounds[name]) return;
  const sound = sounds[name];
  sound.pause();
  sound.currentTime = 0;
  const promise = sound.play();
  if (promise && typeof promise.catch === "function") promise.catch(() => {});
}

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

function createDeck(level) {
  const cards = [];
  level.pairs.forEach((pair) => {
    cards.push({ pairId: pair.id, type: "photo", name: pair.name, image: pair.image });
    cards.push({ pairId: pair.id, type: "name", name: pair.name });
  });
  return shuffle(cards);
}

function buildCard(cardData, index) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "card";
  card.dataset.pairId = cardData.pairId;
  card.dataset.cardIndex = String(index);
  card.setAttribute("aria-label", "Face-down UK memory card");

  const front = document.createElement("span");
  front.className = "card-face card-front";
  front.innerHTML = '<span class="card-back-mark">✦<small>UK Passport</small>✦</span>';

  const back = document.createElement("span");
  back.className = `card-face card-content ${cardData.type}-content`;

  if (cardData.type === "photo") {
    const image = document.createElement("img");
    image.src = cardData.image;
    image.alt = `Realistic view of ${cardData.name}`;
    image.loading = "eager";
    image.addEventListener("error", () => back.classList.add("missing"));
    const fallback = document.createElement("span");
    fallback.className = "photo-fallback";
    fallback.textContent = cardData.name;
    back.append(image, fallback);
  } else {
    const name = document.createElement("strong");
    cardData.name.split(" ").forEach((word, wordIndex) => {
      if (wordIndex > 0) name.append(document.createTextNode(" "));
      const wordPart = document.createElement("span");
      wordPart.textContent = word;
      name.append(wordPart);
    });
    back.append(name);
  }

  card.append(front, back);
  card.addEventListener("click", () => flipCard(card));
  return card;
}

function renderLevel() {
  window.clearTimeout(mismatchTimer);
  firstCard = null;
  secondCard = null;
  boardLocked = false;
  matchedPairs = 0;
  levelMoves = 0;
  previousAttemptMatched = false;

  const level = levels[currentLevel];
  elements.country.textContent = level.country;
  elements.levelLabel.textContent = `Level ${currentLevel + 1} of ${levels.length}`;
  elements.boardTitle.textContent = level.country;
  elements.board.innerHTML = "";
  createDeck(level).forEach((cardData, index) => elements.board.append(buildCard(cardData, index)));
  updateHud();
}

function flipCard(card) {
  if (boardLocked || card === firstCard || card.classList.contains("matched") || card.classList.contains("flipped")) return;

  playSound("click");
  card.classList.add("flipped");
  card.setAttribute("aria-label", `Revealed card: ${card.dataset.pairId}`);

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  boardLocked = true;
  levelMoves += 1;
  totalMoves += 1;
  updateHud();

  if (firstCard.dataset.pairId === secondCard.dataset.pairId) {
    handleMatch();
  } else {
    handleMismatch();
  }
}

function handleMatch() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  matchedPairs += 1;
  score += 100;
  if (previousAttemptMatched) score += 25;
  previousAttemptMatched = true;
  playSound("correct");
  updateHud();
  resetTurn();

  if (matchedPairs === 3) {
    boardLocked = true;
    window.setTimeout(completeLevel, 650);
  }
}

function handleMismatch() {
  previousAttemptMatched = false;
  playSound("wrong");
  mismatchTimer = window.setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    firstCard.setAttribute("aria-label", "Face-down UK memory card");
    secondCard.setAttribute("aria-label", "Face-down UK memory card");
    resetTurn();
  }, 800);
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  boardLocked = false;
}

function completeLevel() {
  const level = levels[currentLevel];
  stamps += 1;
  score += 200;
  updateHud();
  renderStamps();
  playSound("correct");

  elements.stampReward.textContent = level.stamp;
  elements.levelTitle.textContent = `${level.country} Complete!`;
  elements.stampMessage.textContent = `${level.country} stamp collected!`;
  elements.levelMoves.textContent = String(levelMoves);
  elements.nextLevel.textContent = currentLevel === levels.length - 1 ? "Complete Passport →" : "Next Destination →";
  elements.levelOverlay.hidden = false;
  elements.nextLevel.focus();
}

function renderStamps() {
  elements.stampList.innerHTML = "";
  levels.forEach((level, index) => {
    const collected = index < stamps;
    const item = document.createElement("div");
    item.className = `stamp-item${collected ? " collected" : ""}`;
    item.innerHTML = `<span class="stamp-symbol">${level.stamp}</span><strong>${level.country}</strong><span class="stamp-state">${collected ? "✓" : "○"}</span>`;
    elements.stampList.append(item);
  });
}

function updateHud() {
  elements.stamps.textContent = String(stamps);
  elements.matches.textContent = String(matchedPairs);
  elements.moves.textContent = String(levelMoves);
  elements.score.textContent = String(score);
}

elements.nextLevel.addEventListener("click", () => {
  playSound("click");
  elements.levelOverlay.hidden = true;
  if (currentLevel === levels.length - 1) {
    showFinal();
    return;
  }
  currentLevel += 1;
  renderLevel();
  document.querySelector(".game-layout").scrollIntoView({ behavior: "smooth", block: "start" });
});

function showFinal() {
  elements.finalScore.textContent = String(score);
  elements.totalMoves.textContent = String(totalMoves);
  elements.rank.textContent = totalMoves <= 16 ? "MEMORY MASTER" : totalMoves <= 24 ? "BRILLIANT TRAVELLER" : "UK EXPLORER";
  elements.finalOverlay.hidden = false;
  playSound("win");
  elements.restart.focus();
}

function restartGame() {
  window.clearTimeout(mismatchTimer);
  currentLevel = 0;
  totalMoves = 0;
  score = 0;
  stamps = 0;
  elements.finalOverlay.hidden = true;
  elements.levelOverlay.hidden = true;
  renderStamps();
  renderLevel();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

elements.restart.addEventListener("click", () => {
  playSound("click");
  restartGame();
});

function openHow() {
  playSound("click");
  elements.howModal.hidden = false;
  elements.start.focus();
}

function closeHow(returnFocus = true) {
  playSound("click");
  elements.howModal.hidden = true;
  if (returnFocus) elements.howButton.focus();
}

elements.howButton.addEventListener("click", openHow);
elements.closeHow.addEventListener("click", () => closeHow());
elements.start.addEventListener("click", () => closeHow(false));
elements.howModal.addEventListener("pointerdown", (event) => {
  if (event.target === elements.howModal) closeHow();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.howModal.hidden) closeHow();
});

elements.soundButton.addEventListener("click", () => {
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
});

renderStamps();
renderLevel();
