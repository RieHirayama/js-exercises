/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js"
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COLS: () => (/* binding */ COLS),
/* harmony export */   RESOLUTION: () => (/* binding */ RESOLUTION),
/* harmony export */   ROWS: () => (/* binding */ ROWS)
/* harmony export */ });
const ROWS = 50;
const COLS = 50;
const RESOLUTION = 10;


/***/ },

/***/ "./src/renderGrid.js"
/*!***************************!*\
  !*** ./src/renderGrid.js ***!
  \***************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderGrid: () => (/* binding */ renderGrid)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./src/constants.js");


function renderGrid(grid, ctx) {
  for (let row = 0; row < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS; row++) {
    for (let col = 0; col < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION, row * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION, _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION, _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}


/***/ },

/***/ "./src/updateGrid.js"
/*!***************************!*\
  !*** ./src/updateGrid.js ***!
  \***************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateGrid: () => (/* binding */ updateGrid)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./src/constants.js");


function updateGrid(grid) {
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS; row++) {
    for (let col = 0; col < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS; col++) {
      let liveNeighbors = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const newRow = row + i;
          const newCol = col + j;
          if (
            newRow >= 0 &&
            newRow < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS &&
            newCol >= 0 &&
            newCol < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS &&
            grid[newRow][newCol]
          ) {
            liveNeighbors++;
          }
        }
      }

      if (grid[row][col]) {
        if (liveNeighbors < 2 || liveNeighbors > 3) nextGrid[row][col] = false;
      } else {
        if (liveNeighbors === 3) nextGrid[row][col] = true;
      }
    }
  }
  return nextGrid;
}


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./src/constants.js");
/* harmony import */ var _renderGrid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderGrid.js */ "./src/renderGrid.js");
/* harmony import */ var _updateGrid_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateGrid.js */ "./src/updateGrid.js");




const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION;
canvas.height = _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION;

let animationId = null;

const STEP_INTERVAL = 100;
let lastTime = 0;
let timeBuffer = 0;

const sound = new Audio("./decision1.mp3");

let grid = new Array(_constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS)
  .fill(null)
  .map(() => new Array(_constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS).fill(null).map(() => !!Math.floor(Math.random() * 2)));

canvas.addEventListener("click", (evt) => {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION);
  const col = Math.floor(pos.x / _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION);

  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid, ctx);
});

function update(timestamp) {
  if (lastTime === 0) lastTime = timestamp;

  const delta = timestamp - lastTime;
  lastTime = timestamp;
  timeBuffer += delta;

  while (timeBuffer >= STEP_INTERVAL) {
    grid = (0,_updateGrid_js__WEBPACK_IMPORTED_MODULE_2__.updateGrid)(grid);
    (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid, ctx);
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

(0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid, ctx);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map