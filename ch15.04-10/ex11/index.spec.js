import { test, expect } from "@playwright/test";

// ToDo を1件追加する
async function addTodo(page, text) {
  await page.getByPlaceholder("What needs to be done?").fill(text);
  await page.getByRole("button", { name: "Add" }).click();
}

// 指定したラベルの ToDo のチェックボックスをクリックして完了にする
async function completeTodo(page, text) {
  const item = page.locator("#todo-list li").filter({ hasText: text }).first();
  await item.getByRole("checkbox").click();
}

// 現在表示されている ToDo のラベル一覧を取得
async function getVisibleTodoLabels(page) {
  return await page.locator("#todo-list li .content").allTextContents();
}

// 現在表示されている ToDo の件数を取得
async function countTodos(page) {
  return await page.locator("#todo-list li").count();
}

test.describe("ex11 hashchange テスト", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.04-10/ex11/");
  });

  test("初期状態では ToDo は 0 件", async ({ page }) => {
    await expect(await countTodos(page)).toBe(0);
  });

  test("All / Active / Completed で表示が切り替わる", async ({ page }) => {
    // ToDo を2件追加
    await addTodo(page, "タスクA");
    await addTodo(page, "タスクB");

    // B を完了にする
    await completeTodo(page, "タスクB");

    // All
    await page.getByRole("link", { name: "All" }).click();
    let labels = await getVisibleTodoLabels(page);
    await expect(labels).toHaveLength(2);
    await expect(labels).toContain("タスクA");
    await expect(labels).toContain("タスクB");

    // Active（未完了のみ）
    await page.getByRole("link", { name: "Active" }).click();
    labels = await getVisibleTodoLabels(page);
    await expect(labels).toHaveLength(1);
    await expect(labels).toEqual(["タスクA"]);

    // Completed（完了のみ）
    await page.getByRole("link", { name: "Completed" }).click();
    labels = await getVisibleTodoLabels(page);
    await expect(labels).toHaveLength(1);
    await expect(labels).toEqual(["タスクB"]);
  });

  test("Active 画面で完了にした ToDo は一覧から消える", async ({ page }) => {
    await addTodo(page, "タスクA");
    await addTodo(page, "タスクB");

    // Active タブへ（最初は両方未完了なので2件見える）
    await page.getByRole("link", { name: "Active" }).click();
    let labels = await getVisibleTodoLabels(page);
    await expect(labels).toHaveLength(2);
    await expect(labels).toContain("タスクA");
    await expect(labels).toContain("タスクB");

    // Active 画面のまま「タスクB」を完了にする
    await completeTodo(page, "タスクB");

    // Active 画面では B が消え、A のみが残るはず
    labels = await getVisibleTodoLabels(page);
    await expect(labels).toHaveLength(1);
    await expect(labels).toEqual(["タスクA"]);
  });
});
