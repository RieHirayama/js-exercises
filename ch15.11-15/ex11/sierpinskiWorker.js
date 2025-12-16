// シェルピンスキーのギャスケットを描画するワーカーコード
// シェルピンスキーのギャスケット: 三角形から中央の三角形を取り除く操作を繰り返して作られる
onmessage = function(message) {
  const { tile, x0, y0, perPixel } = message.data;
  const { width, height } = tile;

  const imageData = new ImageData(width, height);
  const data = imageData.data;

  // 各ピクセルを整数格子に対応（丸め）させて、中央の三角形の部分かどうかを判定する
  let p = 0;
  for (let row = 0; row < height; row++) { 
    const iy = Math.floor((y0 + row * perPixel) / perPixel);
    for (let col = 0; col < width; col++) {
      const ix = Math.floor((x0 + col * perPixel) / perPixel);

      const on = ((ix & iy) === 0); // 中央の三角形の部分かどうか
      // (ix & iy) === 0 は、
      // x方向とy方向の2進数の桁が同時に立つことを禁止する条件であり、
      // この禁止がすべてのスケールで同時に働くため、
      // 自己相似なシェルピンスキーのギャスケットが自然に現れる。

      const c = on ? 0 : 255; // 黒か白。中央の三角形の部分は白
      data[p++] = c; // R
      data[p++] = c; // G
      data[p++] = c; // B
      data[p++] = 255; // A
    }
  }
  postMessage({ tile, imageData }, [imageData.data.buffer]);
};
