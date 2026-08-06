const soundToggle = document.getElementById("soundToggle");
const soundLabel = document.getElementById("soundLabel");
const soundIcon = soundToggle.querySelector(".sound-icon");

let soundEnabled = true;

function playClick() {
  if (soundEnabled && window.GameSounds) {
    window.GameSounds.play("click");
  }
}

soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundToggle.setAttribute("aria-pressed", String(soundEnabled));
  soundLabel.textContent = soundEnabled ? "Sound On" : "Sound Off";
  soundIcon.textContent = soundEnabled ? "🔊" : "🔇";

  if (soundEnabled) {
    playClick();
  }
});

document
  .querySelectorAll(".world-link, .mobile-actions a")
  .forEach((link) => {
    link.addEventListener("click", playClick);
  });
