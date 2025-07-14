import { sequenceToObject } from "./index.js";
import { jest } from '@jest/globals';


describe("sequenceToObject(...values)", () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test("正しいキーと値のペアからオブジェクトを生成できる", () => {
    expect(sequenceToObject("a", 1, "b", 2)).toEqual({a: 1, b: 2});
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  test("引数に配列を展開して渡しても同じ結果になる", () => {
    const arr = ["x", 10, "y", 20, "z", 30];
    expect(sequenceToObject(...arr)).toEqual({x: 10, y: 20, z: 30});
  });

  test("引数の数が奇数のときエラーを投げる", () => {
    expect(sequenceToObject("a", 1, "b")).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "sequenceToObject エラー:", "引数の数が偶数ではありません"
    );
  });

  test("奇数番目（キー）が文字列でない場合にエラーを投げる", () => {
    expect(sequenceToObject(123, "value", "b", 2)).toBeNull;
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("sequenceToObject エラー:"),
      expect.stringMatching(/奇数番目の引数が文字列ではありません/)
    ); // エラーメッセージがこの文言を含むか確認
  });

  test("空の引数は空オブジェクトを返す", () => {
    expect(sequenceToObject()).toEqual({});
  });
});
