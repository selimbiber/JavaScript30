const PLAYER = document.querySelector(".player");
const VIDEO = document.querySelector(".viewer");
const PROGRESS = document.querySelector(".progress");
const TOGGLE_PLAY_BTN = document.querySelector(".toggle-play");
const SKIP_BUTTONS = document.querySelectorAll("[data-skip]");
const RANGES = document.querySelectorAll(".player__slider");
const TOGGLE_FULLSCREEN_BTN = document.querySelector(".toggle-fullscreen");

function togglePlay() {
  VIDEO[VIDEO.paused ? "play" : "pause"]();
}

function updatePlayButton() {
  const ICON = VIDEO.paused ? "►" : "❚ ❚";
  TOGGLE_PLAY_BTN.textContent = ICON;
}

function updateFsButton() {
  const fullscreenStatus = Boolean(TOGGLE_FULLSCREEN_BTN.dataset.fullscreen);

  if (!fullscreenStatus) {
    TOGGLE_FULLSCREEN_BTN.dataset.fullscreen = "";
    VIDEO.requestFullscreen();
    VIDEO.webkitRequestFullscreen(); /* Safari, Chrome */
  } else {
    TOGGLE_FULLSCREEN_BTN.dataset.fullscreen = "on";
    document.exitFullscreen();
    document.webkitExitFullscreen(); /* Safari, Chrome */
  }
}

function skip() {
  VIDEO.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  VIDEO[this.name] = this.value;
}

function handleProgress() {
  const PERCENT = Math.round((VIDEO.currentTime / VIDEO.duration) * 100);
  if (!isNaN(PERCENT)) PROGRESS.value = PERCENT;
}

function scrub(e) {
  const scrubTime = (e.offsetX / PROGRESS.offsetWidth) * VIDEO.duration;
  VIDEO.currentTime = scrubTime;
}

VIDEO.addEventListener("click", togglePlay);
VIDEO.addEventListener("play", updatePlayButton);
VIDEO.addEventListener("pause", updatePlayButton);
VIDEO.addEventListener("timeupdate", handleProgress);

TOGGLE_PLAY_BTN.addEventListener("click", togglePlay);

SKIP_BUTTONS.forEach((btn) => btn.addEventListener("click", skip));

RANGES.forEach((range) => {
  range.addEventListener("change", handleRangeUpdate);
  range.addEventListener("mousemove", handleRangeUpdate);
});

let mousedown = false;

PROGRESS.addEventListener("click", scrub);
PROGRESS.addEventListener("mousemove", (e) => mousedown && scrub(e));
PROGRESS.addEventListener("mousedown", () => (mousedown = true));
PROGRESS.addEventListener("mouseup", () => (mousedown = false));

TOGGLE_FULLSCREEN_BTN.addEventListener("click", updateFsButton);
