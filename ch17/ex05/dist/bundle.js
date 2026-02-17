/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ex05/src/constants.js"
/*!*******************************!*\
  !*** ./ex05/src/constants.js ***!
  \*******************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   COLS: () => (/* binding */ COLS),\n/* harmony export */   RESOLUTION: () => (/* binding */ RESOLUTION),\n/* harmony export */   ROWS: () => (/* binding */ ROWS)\n/* harmony export */ });\nconst ROWS = 50;\r\nconst COLS = 50;\r\nconst RESOLUTION = 10;\r\n\n\n//# sourceURL=webpack://ch17/./ex05/src/constants.js?\n}");

/***/ },

/***/ "./ex05/src/index.js"
/*!***************************!*\
  !*** ./ex05/src/index.js ***!
  \***************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./ex05/src/constants.js\");\n/* harmony import */ var _renderGrid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderGrid.js */ \"./ex05/src/renderGrid.js\");\n/* harmony import */ var _updateGrid_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateGrid.js */ \"./ex05/src/updateGrid.js\");\n\r\n\r\n\r\n\r\nconst canvas = document.querySelector(\"#screen\");\r\nconst ctx = canvas.getContext(\"2d\");\r\nconst startButton = document.querySelector(\"#start\");\r\nconst pauseButton = document.querySelector(\"#pause\");\r\n\r\ncanvas.width = _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION;\r\ncanvas.height = _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION;\r\n\r\nlet animationId = null;\r\n\r\nconst STEP_INTERVAL = 100;\r\nlet lastTime = 0;\r\nlet timeBuffer = 0;\r\n\r\nconst sound = new Audio(\"./decision1.mp3\");\r\n\r\nlet grid = new Array(_constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS)\r\n  .fill(null)\r\n  .map(() => new Array(_constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS).fill(null).map(() => !!Math.floor(Math.random() * 2)));\r\n\r\ncanvas.addEventListener(\"click\", (evt) => {\r\n  const rect = canvas.getBoundingClientRect();\r\n  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };\r\n\r\n  const row = Math.floor(pos.y / _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION);\r\n  const col = Math.floor(pos.x / _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION);\r\n\r\n  grid[row][col] = !grid[row][col];\r\n  sound.cloneNode().play();\r\n  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid, ctx);\r\n});\r\n\r\nfunction update(timestamp) {\r\n  if (lastTime === 0) lastTime = timestamp;\r\n\r\n  const delta = timestamp - lastTime;\r\n  lastTime = timestamp;\r\n  timeBuffer += delta;\r\n\r\n  while (timeBuffer >= STEP_INTERVAL) {\r\n    grid = (0,_updateGrid_js__WEBPACK_IMPORTED_MODULE_2__.updateGrid)(grid);\r\n    (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid, ctx);\r\n    timeBuffer -= STEP_INTERVAL;\r\n  }\r\n\r\n  animationId = requestAnimationFrame(update);\r\n}\r\n\r\nstartButton.addEventListener(\"click\", () => {\r\n  if (animationId) return;\r\n  lastTime = 0;\r\n  timeBuffer = 0;\r\n  animationId = requestAnimationFrame(update);\r\n});\r\n\r\npauseButton.addEventListener(\"click\", () => {\r\n  if (!animationId) return;\r\n  cancelAnimationFrame(animationId);\r\n  animationId = null;\r\n});\r\n\r\n(0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid, ctx);\r\n\n\n//# sourceURL=webpack://ch17/./ex05/src/index.js?\n}");

/***/ },

/***/ "./ex05/src/renderGrid.js"
/*!********************************!*\
  !*** ./ex05/src/renderGrid.js ***!
  \********************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderGrid: () => (/* binding */ renderGrid)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./ex05/src/constants.js\");\n\r\n\r\nfunction renderGrid(grid, ctx) {\r\n  for (let row = 0; row < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS; row++) {\r\n    for (let col = 0; col < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS; col++) {\r\n      const cell = grid[row][col];\r\n      ctx.beginPath();\r\n      ctx.rect(col * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION, row * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION, _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION, _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION);\r\n      ctx.fillStyle = cell ? \"black\" : \"white\";\r\n      ctx.fill();\r\n      ctx.stroke();\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://ch17/./ex05/src/renderGrid.js?\n}");

/***/ },

/***/ "./ex05/src/updateGrid.js"
/*!********************************!*\
  !*** ./ex05/src/updateGrid.js ***!
  \********************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   updateGrid: () => (/* binding */ updateGrid)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./ex05/src/constants.js\");\n\r\n\r\nfunction updateGrid(grid) {\r\n  const nextGrid = grid.map((arr) => [...arr]);\r\n\r\n  for (let row = 0; row < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS; row++) {\r\n    for (let col = 0; col < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS; col++) {\r\n      let liveNeighbors = 0;\r\n\r\n      for (let i = -1; i <= 1; i++) {\r\n        for (let j = -1; j <= 1; j++) {\r\n          if (i === 0 && j === 0) continue;\r\n          const newRow = row + i;\r\n          const newCol = col + j;\r\n          if (\r\n            newRow >= 0 &&\r\n            newRow < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS &&\r\n            newCol >= 0 &&\r\n            newCol < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS &&\r\n            grid[newRow][newCol]\r\n          ) {\r\n            liveNeighbors++;\r\n          }\r\n        }\r\n      }\r\n\r\n      if (grid[row][col]) {\r\n        if (liveNeighbors < 2 || liveNeighbors > 3) nextGrid[row][col] = false;\r\n      } else {\r\n        if (liveNeighbors === 3) nextGrid[row][col] = true;\r\n      }\r\n    }\r\n  }\r\n  return nextGrid;\r\n}\r\n\n\n//# sourceURL=webpack://ch17/./ex05/src/updateGrid.js?\n}");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ex05/src/index.js");
/******/ 	
/******/ })()
;