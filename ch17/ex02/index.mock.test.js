import { jest } from "@jest/globals";
import {
  listIssues,
  createIssue,
  closeIssue,
} from "./index.js";

function mockFetch(responseJson) {
  return jest.fn(async () => ({
    ok: true,
    async text() {
      return JSON.stringify(responseJson);
    },
  }));
}

test("listIssuesテスト", async () => {
  const fetchFn = mockFetch([{ number: 1, title: "hello" }]);

  const result = await listIssues("o/r", {
    fetchFn,
    token: "dummy",
  });

  expect(fetchFn).toHaveBeenCalledTimes(1);
  expect(result[0].title).toBe("hello");
});

test("createIssueテスト", async () => {
  const fetchFn = mockFetch({ number: 99 });

  const result = await createIssue("o/r", {
    title: "test",
    fetchFn,
    token: "dummy",
  });

  expect(result.number).toBe(99);
});

test("closeIssueテスト", async () => {
  const fetchFn = mockFetch({ number: 5 });

  const result = await closeIssue("o/r", {
    number: 5,
    fetchFn,
    token: "dummy",
  });

  expect(result.number).toBe(5);
});
