import { template } from './index.js';

describe('タグ付きテンプレートテスト', () => {
  test('空文字', () => {
    expect(template``).toBe('');
  });

  test('補間値なし', () => {
    expect(template`test`).toBe('test');
  });

  test('補間値が文字列の場合', () => {
    expect(template`Hello, ${'A'}`).toBe('Hello, string');
  });

  test('補間値が色々', () => {
    const fn = () => {};
    expect(template`${1} ${null} ${fn}`).toBe('number object function');
  });

  test('補間値が文字列の場合２', () => {
    expect(template`type of 'A' is ${'A'}`).toBe("type of 'A' is string");
  });
});

