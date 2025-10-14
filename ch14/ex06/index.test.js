import { makeProxyAndLogs } from "./index.js";

describe("makeProxyAndLogs", () => {
  test("メソッド呼び出しを記録し、プロパティ読み取りは記録しない", () => {
    const a = {
      p: 1,
      f(x, y) { return x + y; },
    };

    const [proxy, logs] = makeProxyAndLogs(a);

    expect(logs).toEqual([]);       // まだ空
    expect(proxy.p).toBe(1);        // プロパティ読み取り
    expect(logs).toEqual([]);       // プロパティ読み取りでは記録しない

    const result = proxy.f(1, 2);   // メソッド呼び出し
    expect(result).toBe(3);

    expect(logs.length).toBe(1);
    expect(logs[0].name).toBe("f");
    expect(logs[0].args).toEqual([1, 2]);
    expect(typeof logs[0].timestamp).toBe("number");
  });
});

