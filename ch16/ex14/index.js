import fs from "fs";
import { Worker, isMainThread, parentPort, workerData } from "worker_threads";
import { PNG } from "pngjs";

if (isMainThread) {
  // メインスレッド
  const input = fs.createReadStream("input.png").pipe(new PNG());

  input.on("parsed", function () {
    // この index.js 自身を Worker として起動する
    const worker = new Worker(new URL(import.meta.url), {
      workerData: {
        width: this.width,
        height: this.height,
        data: this.data,
      },
    });

    worker.once("message", (processed) => {
      const output = new PNG({ width: this.width, height: this.height });
      output.data = processed;

      output.pack().pipe(fs.createWriteStream("output.png")).on("finish", () => {
        console.log("output.png written");
      });
    });

    worker.on("error", console.error);
  });
} else {
  // ワーカースレッド
  const { width, height, data } = workerData;

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
      output[outIdx] = r / kSum;
      output[outIdx + 1] = g / kSum;
      output[outIdx + 2] = b / kSum;
      output[outIdx + 3] = data[outIdx + 3];
    }
  }

  parentPort.postMessage(output);
}
