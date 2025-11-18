// 例15-2 <inline-circle> カスタム要素
customElements.define("inline-circle", class InlineCircle extends HTMLElement {
  // <inline-circle>要素がドキュメントに挿入されるときに、ブラウザがこのメソッドを呼び出す
  connectedCallback() {
    // 共通の見た目
    this.style.display = "inline-block";
    this.style.borderRadius = "50%";
    this.style.transform = "translateY(10%)";

    // 枠線色（border-color 属性があればそれ、なければ black）
    const borderColor = this.getAttribute("border-color") || "black";
    this.style.borderStyle = "solid";
    this.style.borderWidth = "1px";
    this.style.borderColor = borderColor;

    // 直径（diameter 属性があればそれ、なければ 0.8em）
    const diameter = this.getAttribute("diameter") || "0.8em";
    if (!this.style.width) {
      this.style.width = diameter;
    }
    if (!this.style.height) {
      this.style.height = diameter;
    }

    // 背景色（color 属性があれば反映）
    const color = this.getAttribute("color");
    if (color) {
      this.style.backgroundColor = color;
    }
  }

  // 変化時通知する属性
  static get observedAttributes() {
    return ["diameter", "color", "border-color"];
  }

  // 属性変更時にブラウザがこのメソッドを呼び出す
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "diameter": {
        const d = newValue || "0.8em";
        this.style.width = d;
        this.style.height = d;
        break;
      }
      case "color": {
        this.style.backgroundColor = newValue || "";
        break;
      }
      case "border-color": {
        const c = newValue || "black";
        if (!this.style.borderStyle) this.style.borderStyle = "solid";
        if (!this.style.borderWidth) this.style.borderWidth = "1px";
        this.style.borderColor = c;
        break;
      }
    }
  }
});
