import { escapeString1, escapeString2} from './index.js';

describe('escapeString1', () => {
    test('\\n test', () => {
      const input = 'Hello\nWorld!';
      const expected = 'Hello\\nWorld!';
      expect(escapeString1(input)).toBe(expected);
    });
    test('\\r test', () => {
      const input = 'Hello\rWorld!';
      const expected = 'Hello\\rWorld!';
      expect(escapeString1(input)).toBe(expected);
    });
    test('\\t test', () => {
      const input = 'Hello\tWorld!';
      const expected = 'Hello\\tWorld!';
      expect(escapeString1(input)).toBe(expected);
    });
    test('\\b test', () => {
      const input = 'Hello\bWorld!';
      const expected = 'Hello\\bWorld!';
      expect(escapeString1(input)).toBe(expected);
    });
    test('\\f test', () => {
      const input = 'Hello\fWorld!';
      const expected = 'Hello\\fWorld!';
      expect(escapeString1(input)).toBe(expected);
    });
    test('\\v test', () => {
      const input = 'Hello\vWorld!';
      const expected = 'Hello\\vWorld!';
      expect(escapeString1(input)).toBe(expected);
    });
    test('\\0 test', () => {
      const input = 'Hello\0World!';
      const expected = 'Hello\\0World!';
      expect(escapeString1(input)).toBe(expected);
    });
    test('\' test', () => {
      const input = 'Hello\'World!';
      const expected = 'Hello\\\'World!';
      expect(escapeString1(input)).toBe(expected);
    });
    test('\\" test', () => {
      const input = 'Hello"World!';
      const expected = 'Hello\\"World!';
      expect(escapeString1(input)).toBe(expected);
    });
    test('\\\\ test', () => {
      const input = 'Hello\\World!';
      const expected = 'Hello\\\\World!';
      expect(escapeString1(input)).toBe(expected);
    });
});

describe('escapeString2', () => {
    test('\\n test', () => {
      const input = 'Hello\nWorld!';
      const expected = 'Hello\\nWorld!';
      expect(escapeString2(input)).toBe(expected);
    });
    test('\\r test', () => {
      const input = 'Hello\rWorld!';
      const expected = 'Hello\\rWorld!';
      expect(escapeString2(input)).toBe(expected);
    });
    test('\\t test', () => {
      const input = 'Hello\tWorld!';
      const expected = 'Hello\\tWorld!';
      expect(escapeString2(input)).toBe(expected);
    });
    test('\\b test', () => {
      const input = 'Hello\bWorld!';
      const expected = 'Hello\\bWorld!';
      expect(escapeString2(input)).toBe(expected);
    });
    test('\\f test', () => {
      const input = 'Hello\fWorld!';
      const expected = 'Hello\\fWorld!';
      expect(escapeString2(input)).toBe(expected);
    });
    test('\\v test', () => {
      const input = 'Hello\vWorld!';
      const expected = 'Hello\\vWorld!';
      expect(escapeString2(input)).toBe(expected);
    });
    test('\\0 test', () => {
      const input = 'Hello\0World!';
      const expected = 'Hello\\0World!';
      expect(escapeString2(input)).toBe(expected);
    });
    test('\' test', () => {
      const input = 'Hello\'World!';
      const expected = 'Hello\\\'World!';
      expect(escapeString2(input)).toBe(expected);
    });
    test('\\" test', () => {
      const input = 'Hello"World!';
      const expected = 'Hello\\"World!';
      expect(escapeString2(input)).toBe(expected);
    });
    test('\\\\ test', () => {
        const input = 'Hello\\World!';
        const expected = 'Hello\\\\World!';
        expect(escapeString2(input)).toBe(expected);
    });
});