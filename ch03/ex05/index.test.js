import { convertCRLFtoLF } from "./index.js";
import { convertLFtoCRLF } from "./index.js";

describe("convertLFtoCRLF", () => {
    it("LF to CR+LF", () => {
        const str = "word1\nword2\n";
        const expected = "word1\r\nword2\r\n";
        expect(convertLFtoCRLF(str)).toBe(expected);
    });
});

describe("convertCRLFtoLF", () => {
    it("CR+LF to LF", () => {
        const str = "word1\r\nword2\r\n";
        const expected = "word1\nword2\n";
        expect(convertCRLFtoLF(str)).toBe(expected);
    });
});