import { ROWS, COLS, RESOLUTION } from "./constants.js";
import { renderGrid } from "./renderGrid.js";
import { updateGrid } from "./updateGrid.js";

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

let animationId = null;

const STEP_INTERVAL = 100;
let lastTime = 0;
let timeBuffer = 0;

const sound = new Audio("./decision1.mp3");

let grid = new Array(ROWS)
  .fill(null)
  .map(() => new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2)));

canvas.addEventListener("click", (evt) => {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);

  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  renderGrid(grid, ctx);
});

function update(timestamp) {
  if (lastTime === 0) lastTime = timestamp;

  const delta = timestamp - lastTime;
  lastTime = timestamp;
  timeBuffer += delta;

  while (timeBuffer >= STEP_INTERVAL) {
    grid = updateGrid(grid);
    renderGrid(grid, ctx);
    timeBuffer -= STEP_INTERVAL;
  }

  animationId = requestAnimationFrame(update);
}

startButton.addEventListener("click", () => {
  if (animationId) return;
  lastTime = 0;
  timeBuffer = 0;
  animationId = requestAnimationFrame(update);
});

pauseButton.addEventListener("click", () => {
  if (!animationId) return;
  cancelAnimationFrame(animationId);
  animationId = null;
});

renderGrid(grid, ctx);
