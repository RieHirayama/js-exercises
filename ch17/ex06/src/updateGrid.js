import { ROWS, COLS } from "./constants.js";

export function updateGrid(grid) {
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let liveNeighbors = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const newRow = row + i;
          const newCol = col + j;
          if (
            newRow >= 0 &&
            newRow < ROWS &&
            newCol >= 0 &&
            newCol < COLS &&
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
