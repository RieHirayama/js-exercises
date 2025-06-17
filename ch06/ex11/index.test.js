import { point } from './index.js';

describe('pointオブジェクト（極座標とデカルト座標の変換）', () => {
  // 各テストの前に point を初期化
  beforeEach(() => {
    point.r = 0;
    point.theta = 0;
  });

  test('x, y のゲッターが極座標から正しいデカルト座標を返す', () => {
    point.r = 5;
    point.theta = Math.PI / 4; // 45度

    const expected = 5 * Math.SQRT1_2;
    expect(point.x).toBeCloseTo(expected, 4);
    expect(point.y).toBeCloseTo(expected, 4);
  });

  test('x を設定すると r と theta が正しく更新される', () => {
    point.y = 4;
    point.x = 3;

    expect(point.r).toBeCloseTo(5, 4);
    expect(point.theta).toBeCloseTo(Math.atan2(4, 3), 4);
  });

  test('y を設定すると r と theta が正しく更新される', () => {
    point.x = 3;
    point.y = 4;

    expect(point.r).toBeCloseTo(5, 4);
    expect(point.theta).toBeCloseTo(Math.atan2(4, 3), 4);
  });

  test('x に NaN を代入するとエラーになる', () => {
    expect(() => {
      point.x = NaN;
    }).toThrow("x cannot be NaN");
  });

  test('y に NaN を代入するとエラーになる', () => {
    expect(() => {
      point.y = NaN;
    }).toThrow("y cannot be NaN");
  });
});