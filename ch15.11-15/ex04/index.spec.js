import { expect, test } from "@playwright/test";

// 新しい ToDo アイテムを追加する関数
async function addToDo(page, todo) {
  await page.getByRole("textbox").fill(todo);
  await page.getByRole("button", { name: "Add" }).click();
}

// チェックボックスをオンにする関数
async function checkToDo(page, index) {
  await page.getByRole("listitem").nth(index).getByRole("checkbox").check();
}

// 削除ボタンをクリックして ToDo アイテムを削除する関数
async function deleteToDo(page, index) {
  await page
    .getByRole("listitem")
    .nth(index)
    .getByRole("button", { name: "❌" })
    .click();
}

// カウントする関数
async function countToDos(page) {
  return await page.getByRole("listitem").count();
}

// 指定したindexの ToDo アイテムを取得する関数
function queryToDo(page, index) {
  return page.getByRole("listitem").nth(index);
}

test.describe("simple todo app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.11-15/ex04");
  });

  test("no default todos", async ({ page }) => {
    expect(await countToDos(page)).toBe(0);
  });

  test("add new todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");

    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");
  });

  test("add multiple todos", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");

    expect(await countToDos(page)).toBe(2);

    const todo1 = queryToDo(page, 0);
    const label1 = todo1.getByText("練習問題を完了する");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    const todo2 = queryToDo(page, 1);
    const label2 = todo2.getByText("質問表に質問を記載する");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "none");
  });

  test("delete todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");
    await deleteToDo(page, 0);

    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");
  });

  test("complete todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");
    await checkToDo(page, 1);

    expect(await countToDos(page)).toBe(2);

    const todo1 = queryToDo(page, 0);
    const label1 = todo1.getByText("練習問題を完了する");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    const todo2 = queryToDo(page, 1);
    const label2 = todo2.getByText("質問表に質問を記載する");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "line-through");
  });

  test("ページのリロード後も ToDo が保持されることを確認", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");
    await checkToDo(page, 1);

    // ページをリロード
    await page.reload();

    // リロード後も todos が存在することを確認
    expect(await countToDos(page)).toBe(2);

    const todo1 = queryToDo(page, 0);
    const label1 = todo1.getByText("練習問題を完了する");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    const todo2 = queryToDo(page, 1);
    const label2 = todo2.getByText("質問表に質問を記載する");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "line-through");
  });

  test("複数タブ間で ToDo が同期されることを確認", async ({ browser }) => {
    // タブ1を開く
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto("/ch15.11-15/ex04");

    // タブ2を開く
    const page2 = await context.newPage();
    await page2.goto("/ch15.11-15/ex04");

    // タブ1で todo を追加
    await addToDo(page1, "質問表に質問を記載する");
    expect(await countToDos(page1)).toBe(1);

    // タブ2でも同じ todo が表示されることを確認
    // storage イベントが発火するまで少し待つ
    await page2.waitForTimeout(100);
    expect(await countToDos(page2)).toBe(1);
    const label = queryToDo(page2, 0).getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();

    // タブ2で別の todo を追加
    await addToDo(page2, "練習問題を完了する");
    expect(await countToDos(page2)).toBe(2);

    // タブ1でも新しい todo が表示されることを確認
    await page1.waitForTimeout(100);
    expect(await countToDos(page1)).toBe(2);
    const newLabel = queryToDo(page1, 0).getByText("練習問題を完了する");
    await expect(newLabel).toBeVisible();

    // タブ2で最初の todo を完了
    await checkToDo(page2, 1);

    // タブ1でも完了状態が反映されることを確認
    await page1.waitForTimeout(100);
    const completedLabel = queryToDo(page1, 1).getByText("質問表に質問を記載する");
    await expect(completedLabel).toHaveCSS("text-decoration-line", "line-through");

    // タブ2でタスクを削除
    await deleteToDo(page2, 0);
    expect(await countToDos(page2)).toBe(1);

    // タブ1でも削除が反映されることを確認
    await page1.waitForTimeout(100);
    expect(await countToDos(page1)).toBe(1);

    await context.close();
  });
});
