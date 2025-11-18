document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    // 元画像描画
    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    // グレースケールへの変換 (RGB を足して平均を取っている)
    //     for (let i = 0; i < data.length; i += 4) {
    //   const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    //   data[i] = avg;
    //   data[i + 1] = avg;
    //   data[i + 2] = avg;
    // }

    // filteredCtx.putImageData(imageData, 0, 0);
    
    // 5x5 ガウシアンフィルタ
    // ガウシアンフィルタを実装する場合はこの周辺のコードを変更しなさい
    // imageData の中身はそのままに別の配列に結果を格納するとよい
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
    const kernelSum = 273; // 上のカーネルの値の合計

    const width = img.width;
    const height = img.height;

    // 出力用配列を作成（元のimageData.dataとは別の配列に格納）
    const outputData = new Uint8ClampedArray(data.length);
    
    // 1ピクセルごとに畳み込み（RGB のみ、アルファは元の値をそのまま）
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let rSum = 0;
        let gSum = 0;
        let bSum = 0;

        // カーネルの 5x5 領域を走査
        for (let ky = 0; ky < kernelSize; ky++) {
          for (let kx = 0; kx < kernelSize; kx++) {
            const offsetY = y + (ky - kernelHalf);
            const offsetX = x + (kx - kernelHalf);

            // 画像の外にはみ出る場合は、端のピクセルでクランプ
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
        // アルファ値は元の値をそのままコピー
        outputData[index + 3] = data[index + 3];
      }
    }

    const outputImageData = new ImageData(outputData, width, height);
    filteredCtx.putImageData(outputImageData, 0, 0);
  });

  reader.readAsDataURL(file);
});
