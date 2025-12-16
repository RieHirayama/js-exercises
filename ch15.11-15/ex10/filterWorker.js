self.onmessage = (event) => {
  const { width, height, buffer } = event.data;

  const data = new Uint8ClampedArray(buffer);

  // 代表的な 5x5 ガウシアンカーネル（合計 273）
  const kernel = [
    [1, 4, 7, 4, 1],
    [4, 16, 26, 16, 4],
    [7, 26, 41, 26, 7],
    [4, 16, 26, 16, 4],
    [1, 4, 7, 4, 1],
  ];
  const kernelSize = 5;
  const kernelHalf = Math.floor(kernelSize / 2);
  const kernelSum = 273;

  const outputData = new Uint8ClampedArray(data.length);

  // 1ピクセルごとに畳み込み（RGBのみ、アルファは元の値をコピー）
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let rSum = 0;
      let gSum = 0;
      let bSum = 0;

      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          const offsetY = y + (ky - kernelHalf);
          const offsetX = x + (kx - kernelHalf);

          const sampleY = Math.min(height - 1, Math.max(0, offsetY));
          const sampleX = Math.min(width - 1, Math.max(0, offsetX));

          const sampleIndex = (sampleY * width + sampleX) * 4;
          const weight = kernel[ky][kx];

          rSum += data[sampleIndex] * weight;
          gSum += data[sampleIndex + 1] * weight;
          bSum += data[sampleIndex + 2] * weight;
        }
      }

      const index = (y * width + x) * 4;
      outputData[index] = rSum / kernelSum;
      outputData[index + 1] = gSum / kernelSum;
      outputData[index + 2] = bSum / kernelSum;
      outputData[index + 3] = data[index + 3];
    }
  }

  // Transferable で返す（コピーを避けて高速）
  // ※第2引数の配列に第1引数内のArrayBufferを指定しているので、ArrayBufferはワーカー間でコピーではなく、転送されるだけ
  self.postMessage(
    { type: "done", width, height, buffer: outputData.buffer },
    [outputData.buffer]
  );
};
