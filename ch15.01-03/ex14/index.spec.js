import { test, expect } from "@playwright/test";

const goto = (page) => page.goto("/ch15.01-03/ex14/index.html");
const getSelect = (page) => page.getByTestId("select");
const food1 = (page) => page.getByTestId("food1");
const st1 = (page) => page.getByTestId("stationery1");
const st2 = (page) => page.getByTestId("stationery2");

test.describe("Product filter", () => {
  test("初期表示はすべて表示", async ({ page }) => {
    await goto(page);
    await expect(food1(page)).toBeVisible();
    await expect(st1(page)).toBeVisible();
    await expect(st2(page)).toBeVisible();
  });

  test("食品のみ表示", async ({ page }) => {
    await goto(page);
    await getSelect(page).selectOption("food");
    await expect(food1(page)).toBeVisible();
    await expect(st1(page)).toBeHidden();
    await expect(st2(page)).toBeHidden();
  });

  test("文房具のみ表示", async ({ page }) => {
    await goto(page);
    await getSelect(page).selectOption("stationery");
    await expect(food1(page)).toBeHidden();
    await expect(st1(page)).toBeVisible();
    await expect(st2(page)).toBeVisible();
  });

  test("すべてに戻す", async ({ page }) => {
    await goto(page);
    await getSelect(page).selectOption("stationery");
    await getSelect(page).selectOption("all");
    await expect(food1(page)).toBeVisible();
    await expect(st1(page)).toBeVisible();
    await expect(st2(page)).toBeVisible();
  });
});