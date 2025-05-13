import { parseJson } from './index.js';

describe('parseJson', () => {
  it('JSONパース成功', () => {
    const jsonString = '{"name": "apple", "color": "red", "weight": 150}';
    const result = parseJson(jsonString);
    expect(result).toEqual({
      success: true,
      data: {"name": "apple", "color": "red", "weight": 150},
    });
  });

  it('JSONパース失敗', () => {
    const invalidJsonString = '{"name": "apple", "color": "red", weight: 150}';
    const result = parseJson(invalidJsonString);
    expect(result).toEqual({
      success: false,
      error: 'Invalid JSON: Expected double-quoted property name in JSON at position 34',
    });
  });
});