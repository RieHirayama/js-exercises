import { test, expect } from "@playwright/test";

test.describe("<inline-circle> カスタム要素の動作テスト", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.04-10/ex05/");
  });

  test("カスタム要素 inline-circle が定義されている", async ({ page }) => {
    const isDefined = await page.evaluate(() => {
      return !!customElements.get("inline-circle");
    });
    expect(isDefined).toBe(true);
  });

  test("inline-circle が 3 個レンダリングされる", async ({ page }) => {
    const circles = page.locator("inline-circle");
    await expect(circles).toHaveCount(3);
  });

  test("2 個目・3 個目の inline-circle に HTML 上の属性が設定されている", async ({
    page,
  }) => {
    const circle2 = page.locator("inline-circle").nth(1);
    const circle3 = page.locator("inline-circle").nth(2);

    const attrs2 = await circle2.evaluate((el) => ({
      diameter: el.getAttribute("diameter"),
      color: el.getAttribute("color"),
      borderColor: el.getAttribute("border-color"),
    }));

    const attrs3 = await circle3.evaluate((el) => ({
      diameter: el.getAttribute("diameter"),
      color: el.getAttribute("color"),
      borderColor: el.getAttribute("border-color"),
    }));

    expect(attrs2).toEqual({
      diameter: "1.5em",
      color: "red",
      borderColor: "darkred",
    });

    expect(attrs3).toEqual({
      diameter: "24px",
      color: "lightblue",
      borderColor: "navy",
    });
  });

  test("attributeChangedCallback で diameter / color / border-color がスタイルに反映される", async ({
    page,
  }) => {
    const style = await page.evaluate(() => {
      const el = document.createElement("inline-circle");
      document.body.appendChild(el);

      el.setAttribute("diameter", "40px");
      el.setAttribute("color", "green");
      el.setAttribute("border-color", "orange");

      return {
        width: el.style.width,
        height: el.style.height,
        backgroundColor: el.style.backgroundColor,
        borderColor: el.style.borderColor,
      };
    });

    expect(style.width).toBe("40px");
    expect(style.height).toBe("40px");
    expect(style.backgroundColor).toBe("green");
    expect(style.borderColor).toBe("orange");
  });
});
