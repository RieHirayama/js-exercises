## 自分にとって役に立つブックマークレットを作成

### 「ブックマークレット（Bookmarklet）」とは

“ブラウザのブックマークに保存できる小さな JavaScript プログラム”
ふつうブックマークは「URL（https://～）」を保存するものだが、ブックマークレットは、そのURLの代わりに `javascript:` で始まるコードを保存する。
つまり「ブックマークを押す＝そのページでスクリプトを実行する」。

### 作り方（基本ステップ）

1. まず通常の JavaScript でコードを作成

   例：

   ```jsx
   (() => {
     const t = document.title;
     const u = location.href;
     alert(`このページは：${t}\nURL：${u}`);
   })();
   ```

2. それを「1行にまとめて」前に `javascript:` をつける

   例：

   ```jsx
   javascript: (() => {
     const t = document.title;
     const u = location.href;
     alert(`このページは：${t}\nURL：${u}`);
   })();
   ```

3. その文字列を ブックマークのURL欄に貼り付けて保存する。
4. 実行したいページを開き、そのブックマークをクリック。

### ふわひらブックマークレット

- マウスを動かすたび、カーソル付近に絵文字がふわっと散る
- もう一度押すとOFF（スタイル/リスナ/要素を後始末）
- テンションを上げるのに大いに役立つ

#### ふわひらブックマークレットURL

```
javascript:(()=>{const NS="__fuwaHiraFX__";if(window[NS]?.off){window[NS].off();delete window[NS];alert("ふわひら OFF");return}const st=document.createElement("style");st.id="fuwa-hira-style";st.textContent=`#fuwa-hira-layer{position:fixed;inset:0;pointer-events:none;z-index:2147483647}#fuwa-hira-layer .petal{position:fixed;filter:drop-shadow(0 2px 4px rgba(0,0,0,.15));user-select:none;pointer-events:none;opacity:0;animation:kh-pop 1200ms ease-out forwards}@keyframes kh-pop{0%{transform:translate(0,0) scale(.8) rotate(0deg);opacity:.95}70%{opacity:.6}100%{transform:translate(var(--dx),var(--dy)) scale(1) rotate(var(--rot));opacity:0}}`;document.head.appendChild(st);const layer=document.createElement("div");layer.id="fuwa-hira-layer";document.body.appendChild(layer);const EMOJIS=["🍰","🍩","🍨","🍫","🍡","🍵","🧋","🥐","🥞","🥨","🍬"];const rnd=(a,b)=>Math.random()*(b-a)+a;let ticking=false;const spawn=(x,y)=>{for(let i=0;i<3;i++){const e=document.createElement("span");e.className="petal";e.textContent=EMOJIS[(Math.random()*EMOJIS.length)|0];e.style.left=x+"px";e.style.top=y+"px";e.style.fontSize=rnd(14,24)+"px";e.style.setProperty("--dx",rnd(-90,90)+"px");e.style.setProperty("--dy",rnd(-110,-50)+"px");e.style.setProperty("--rot",rnd(-60,60)+"deg");layer.appendChild(e);setTimeout(()=>e.remove(),1250)}};const onMove=(ev)=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{spawn(ev.clientX,ev.clientY);ticking=false})};document.addEventListener("mousemove",onMove);const off=()=>{document.removeEventListener("mousemove",onMove);st.remove();layer.remove()};window[NS]={off};alert("ふわひら ON（再実行でOFF）");})();
```
