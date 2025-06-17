import { getAllPropertyKeys } from './index.js';

describe('getAllPropertyKeys', () => {
  test('独自の列挙可・不可プロパティとSymbolを含む', () => {
    const sym = Symbol('secret');
    const obj = {};

    Object.defineProperty(obj, 'hidden', {
      value: 123,
      enumerable: false
    });

    obj.visible = 'yes';
    obj[sym] = 'symbol value';

    const result = getAllPropertyKeys(obj);

    expect(result).toContain('hidden');
    expect(result).toContain('visible');
    expect(result).toContain(sym);
  });

  test('継承された列挙可能なプロパティ（文字列のみ）を含む', () => {
    const proto = {
      inherited: 'from proto',
      [Symbol('inheritedSymbol')]: 'secret' // Symbolは含まれない
    };

    const obj = Object.create(proto);
    obj.ownProp = 'own';

    const result = getAllPropertyKeys(obj);

    expect(result).toContain('ownProp');
    expect(result).toContain('inherited');
    expect(result.some(k => typeof k === 'symbol')).toBe(false); // 継承のSymbolは含まない
  });

  test('Object.prototypeのプロパティは含まれない', () => {
    const obj = {};
    const result = getAllPropertyKeys(obj);

    // toStringなどが含まれていないこと
    expect(result).not.toContain('toString');
    expect(result).not.toContain('hasOwnProperty');
    expect(result).not.toContain('valueOf');
  });
});