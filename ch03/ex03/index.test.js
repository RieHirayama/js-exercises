import { isEqual } from "./index.js";

describe("isEqual", () => {
    it("returns the result of isEqual", () => {
        expect(isEqual(0.3 - 0.2, 0.1)).toBe(true);
        expect(isEqual(0.2 - 0.1, 0.1)).toBe(true);
    });
})