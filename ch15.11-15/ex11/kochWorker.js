// コッホ雪片を描画するワーカーコード
// コッホ曲線（雪片）：線分の中央の部分を三角形の突起に置き換える操作を繰り返して作る。

// Web Worker: タイル単位でコッホ雪片（Koch Snowflake）を描画して ImageData を返す
// 仕様: onmessage({ tile, x0, y0, perPixel }) -> postMessage({ tile, imageData }, [buffer])

// ─────────────────────────────────────────────────────────────
// 1) コッホ分割（a->b を 4分割して、中央に 60°の突起を作る）
// ─────────────────────────────────────────────────────────────
function kochPoints(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  const p1 = { x: a.x + dx / 3, y: a.y + dy / 3 };
  const p3 = { x: a.x + 2 * dx / 3, y: a.y + 2 * dy / 3 };

  // 中央の突起（60度回転）
  const cos60 = 0.5;
  const sin60 = Math.sqrt(3) / 2;

  const vx = dx / 3;
  const vy = dy / 3;

  const p2 = {
    x: p1.x + (vx * cos60 - vy * sin60),
    y: p1.y + (vx * sin60 + vy * cos60),
  };

  // a -> p1 -> p2 -> p3 -> b
  return [a, p1, p2, p3, b];
}

// ─────────────────────────────────────────────────────────────
// 2) 適応分割：perPixel（ズーム）に応じて「見えるところまで」分割する
//    ・線分が minPixelLen(px) より長い場合は分割を続ける
//    ・maxDepth で上限（暴走防止）
// ─────────────────────────────────────────────────────────────
function buildKochSegmentsAdaptive(perPixel, maxDepth = 14, minPixelLen = 3) {
  // 初期の正三角形（だいたい [-1,1] に収まる）
  const A = { x: -0.6, y: 0.35 };
  const B = { x: 0.6, y: 0.35 };
  const C = { x: 0.0, y: -0.7 };

  // 3辺をスタックで処理（d は深さ）
  const stack = [
    { a: A, b: B, d: 0 },
    { a: B, b: C, d: 0 },
    { a: C, b: A, d: 0 },
  ];

  const out = [];

  while (stack.length) {
    const { a, b, d } = stack.pop();

    // この線分の「ピクセル換算の長さ」
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const pixelLen = Math.hypot(dx, dy) / perPixel;

    // まだ見えるほど長い＆深さ上限未満なら分割
    if (d < maxDepth && pixelLen > minPixelLen) {
      const pts = kochPoints(a, b);
      // 4本に分割して次へ（順序は見た目にはほぼ影響なし）
      stack.push({ a: pts[0], b: pts[1], d: d + 1 });
      stack.push({ a: pts[1], b: pts[2], d: d + 1 });
      stack.push({ a: pts[2], b: pts[3], d: d + 1 });
      stack.push({ a: pts[3], b: pts[4], d: d + 1 });
    } else {
      out.push({ a, b });
    }
  }

  return out;
}

// ─────────────────────────────────────────────────────────────
// 3) 直線描画（Bresenham）
// ─────────────────────────────────────────────────────────────
function drawLineThick2(data, width, height, x0, y0, x1, y1) {
  // 太さ2px相当（2x2）で描く：ズーム時に線が細すぎて途切れるのを軽減
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    for (let oy = 0; oy <= 1; oy++) {
      for (let ox = 0; ox <= 1; ox++) {
        const xx = x0 + ox;
        const yy = y0 + oy;
        if (xx >= 0 && xx < width && yy >= 0 && yy < height) {
          const p = (yy * width + xx) * 4;
          data[p] = 0;
          data[p + 1] = 0;
          data[p + 2] = 0;
          data[p + 3] = 255;
        }
      }
    }

    if (x0 === x1 && y0 === y1) break;

    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
}

// ─────────────────────────────────────────────────────────────
// 4) Worker entry
// ─────────────────────────────────────────────────────────────
onmessage = (message) => {
  const { tile, x0, y0, perPixel } = message.data;
  const { width, height } = tile;

  // 背景を白で塗る
  const imageData = new ImageData(width, height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
    data[i + 3] = 255;
  }

  // このタイルのワールド座標範囲
  const wxMin = x0;
  const wyMin = y0;
  const wxMax = x0 + width * perPixel;
  const wyMax = y0 + height * perPixel;

  // 適応分割で線分を作る
  // - maxDepth: 拡大しすぎても暴走しない上限
  // - minPixelLen: 何pxより長い線分はさらに分割（小さいほど細部が増える）
  const segments = buildKochSegmentsAdaptive(perPixel, 14, 3);

  // タイルにかかりそうな線分だけ描画（ざっくり bbox でスキップ）
  for (const { a, b } of segments) {
    const segMinX = Math.min(a.x, b.x);
    const segMaxX = Math.max(a.x, b.x);
    const segMinY = Math.min(a.y, b.y);
    const segMaxY = Math.max(a.y, b.y);

    if (segMaxX < wxMin || segMinX > wxMax || segMaxY < wyMin || segMinY > wyMax) {
      continue;
    }

    // ワールド→タイル内ピクセル座標
    const x0p = Math.round((a.x - x0) / perPixel);
    const y0p = Math.round((a.y - y0) / perPixel);
    const x1p = Math.round((b.x - x0) / perPixel);
    const y1p = Math.round((b.y - y0) / perPixel);

    drawLineThick2(data, width, height, x0p, y0p, x1p, y1p);
  }

  postMessage({ tile, imageData }, [imageData.data.buffer]);
};