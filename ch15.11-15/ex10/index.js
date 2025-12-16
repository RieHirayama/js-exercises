const imageInput = document.getElementById("image");

const originalCanvas = document.getElementById("original");
const filteredCanvas = document.getElementById("filtered");
const originalCtx = originalCanvas.getContext("2d");
const filteredCtx = filteredCanvas.getContext("2d");

// ページ内を動くオブジェクト配置（画像変換中にメインスレッドがブロックされていないことの確認用）
const animCanvas = document.createElement("canvas");
animCanvas.width = 300;
animCanvas.height = 60;
animCanvas.style.border = "1px solid #ccc";
animCanvas.style.margin = "10px 0";
document.body.insertBefore(animCanvas, document.body.children[1]);

const animCtx = animCanvas.getContext("2d");
let t = 0;  // 時間パラメータ（0から徐々に増加）
function animate() {
  t += 0.05; // 時間を進める
  // キャンバスをクリア
  animCtx.clearRect(0, 0, animCanvas.width, animCanvas.height);
  // sin波を使って左右に揺れる位置を計算
  // Math.sin(t) の結果（-1〜1）を (0〜1) に正規化して、幅を掛ける
  const x = (Math.sin(t) * 0.5 + 0.5) * (animCanvas.width - 20);
  // その座標に円を描画（アニメーション効果）
  animCtx.beginPath();
  animCtx.arc(10 + x, 30, 10, 0, Math.PI * 2);
  animCtx.fill();
  // 毎フレーム更新
  requestAnimationFrame(animate);
}
animate();

// ワーカー生成
const worker = new Worker("./filterWorker.js");

// ワーカーの結果受信
worker.addEventListener("message", (ev) => {
  const msg = ev.data;
  if (msg?.type !== "done") return;

  const { width, height, buffer } = msg;
  const outputData = new Uint8ClampedArray(buffer);
  const outputImageData = new ImageData(outputData, width, height);

  filteredCtx.putImageData(outputImageData, 0, 0);
  imageInput.disabled = false;
});

worker.addEventListener("error", (e) => {
  imageInput.disabled = false;
});

imageInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  imageInput.disabled = true;

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    // 元画像描画
    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);

    // ワーカーへ
    // ※第2引数の配列に第1引数内のArrayBufferを指定しているので、ArrayBufferはワーカー間でコピーではなく、転送されるだけ
    worker.postMessage(
      { width: img.width, height: img.height, buffer: imageData.data.buffer },
      [imageData.data.buffer]
    );
  });

  reader.readAsDataURL(file);
});
