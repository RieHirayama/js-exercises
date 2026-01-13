import { parentPort, workerData } from "worker_threads";

const { width, height, data } = workerData;

// 5x5 ガウシアンカーネル
const kernel = [
  [1, 4, 7, 4, 1],
  [4, 16, 26, 16, 4],
  [7, 26, 41, 26, 7],
  [4, 16, 26, 16, 4],
  [1, 4, 7, 4, 1],
];
const kSize = 5;
const kHalf = 2;
const kSum = 273;

const output = new Uint8ClampedArray(data.length);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    let r = 0, g = 0, b = 0;

    for (let ky = 0; ky < kSize; ky++) {
      for (let kx = 0; kx < kSize; kx++) {
        const sy = Math.min(height - 1, Math.max(0, y + ky - kHalf));
        const sx = Math.min(width - 1, Math.max(0, x + kx - kHalf));
        const idx = (sy * width + sx) * 4;
        const w = kernel[ky][kx];

        r += data[idx] * w;
        g += data[idx + 1] * w;
        b += data[idx + 2] * w;
      }
    }

    const outIdx = (y * width + x) * 4;
    output[outIdx]     = r / kSum;
    output[outIdx + 1] = g / kSum;
    output[outIdx + 2] = b / kSum;
    output[outIdx + 3] = data[outIdx + 3];
  }
}

parentPort.postMessage(output);
