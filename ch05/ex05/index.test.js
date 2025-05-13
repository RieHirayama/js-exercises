import { f } from "./index.js";

describe("f", () => {
    it("偶数の値を持つプロパティだけ残した新しいオブジェクト", () => {
        const o = { x: 1, y: 2, z: 3 };
        const newObj = f(o);
        expect(newObj).toEqual({ y: 2 });
        expect(o).toEqual({ x: 1, y: 2, z: 3 });
    });
    
    it("偶数の値をもたないオブジェクトを入れたとき", () => {
        const o = { x: 1, y: 3, z: 5 };
        const newObj = f(o);
        expect(newObj).toEqual({});
        expect(o).toEqual({ x: 1, y: 3, z: 5 });
    });

    it("数字以外の値を持つプロパティを入れたとき", () => {
        const o = { x: 1, y: "2", z: 3 };
        const newObj = f(o);
        expect(newObj).toEqual({});
        expect(o).toEqual({ x: 1, y: "2", z: 3 });
    });
});