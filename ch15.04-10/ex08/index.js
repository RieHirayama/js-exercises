// SVGはXML名前空間を持つ特殊な要素。
// 通常のHTML要素とは異なる名前空間に属しているため、JavaScriptで動的にSVG要素を作成する際には、
// 専用のメソッドを使用して名前空間を指定する必要がある。
// SVG の名前空間
const SVG_NS = "http://www.w3.org/2000/svg";

// 時計の SVG と針グループを取得
const clock = document.querySelector("#clock");
const handsGroup = clock.querySelector(".hands");

// 既存の時針・分針を取得
const hourHand = clock.querySelector(".hourhand");
const minHand = clock.querySelector(".minutehand");

// 秒針用の <line> 要素を動的に作成して追加する
const secHand = document.createElementNS(SVG_NS, "line");
secHand.setAttribute("class", "secondhand");
secHand.setAttribute("x1", "50");
secHand.setAttribute("y1", "55");
secHand.setAttribute("x2", "50");
secHand.setAttribute("y2", "12");
secHand.setAttribute("stroke", "red");
secHand.setAttribute("stroke-width", "1");

// hands グループに追加
handsGroup.appendChild(secHand);

(function updateClock(){ // SVG時計の針を動かすコード
  let now = new Date();
  let sec = now.getSeconds();
  let min = now.getMinutes() + sec / 60;
  let hour = now.getHours() % 12 + min / 60;
  let secangle = sec * 6;
  let minangle = min * 6;
  let hourangle = hour * 30;
  
  // 時計の針を回転させる
  secHand.setAttribute("transform", `rotate(${secangle} 50 50)`);
  minHand.setAttribute("transform", `rotate(${minangle} 50 50)`);
  hourHand.setAttribute("transform", `rotate(${hourangle} 50 50)`);

  // 1秒ごとにupdateClockを呼び出す
  setTimeout(updateClock, 1000);
}()); // 即時実行関数