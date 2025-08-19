import { jest, describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { retryWithExponentialBackoff } from './index.js';

beforeEach(() => {
  jest.useFakeTimers('legacy');
});

afterEach(() => {
  jest.useRealTimers();
});

describe('retryWithExponentialBackoff', () => {
  test('呼び出しは即時に返り、初回成功で callback(true)', () => {
    const func = jest.fn(() => true);
    const cb = jest.fn();

    retryWithExponentialBackoff(func, 5, cb);

    expect(func).not.toHaveBeenCalled();
    expect(cb).not.toHaveBeenCalled();

    jest.runOnlyPendingTimers();

    expect(func).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(true);
  });

  test('2回失敗 → 3回目成功（待ち時間は 1s → 2s）', () => {
    const func = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    const cb = jest.fn();

    retryWithExponentialBackoff(func, 5, cb);

    // 初回（0ms）
    jest.runOnlyPendingTimers();
    expect(func).toHaveBeenCalledTimes(1);
    expect(cb).not.toHaveBeenCalled();

    // 1回目リトライ（+1000ms）
    jest.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(2);
    expect(cb).not.toHaveBeenCalled();

    // 2回目リトライ（+2000ms）
    jest.advanceTimersByTime(2000);
    expect(func).toHaveBeenCalledTimes(3);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(true);
  });

  test('maxRetry を使い切ると callback(false)', () => {
    const func = jest.fn(() => false);
    const cb = jest.fn();

    retryWithExponentialBackoff(func, 2, cb);

    // 初回
    jest.runOnlyPendingTimers();
    expect(func).toHaveBeenCalledTimes(1);
    expect(cb).not.toHaveBeenCalled();

    // 1回目リトライ（+1000ms）
    jest.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(2);
    expect(cb).not.toHaveBeenCalled();

    // 2回目リトライ（+2000ms）
    jest.advanceTimersByTime(2000);
    expect(func).toHaveBeenCalledTimes(3);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(false);
  });

  test('func が例外を投げたら失敗として扱う', () => {
    const func = jest.fn(() => { throw new Error('boom'); });
    const cb = jest.fn();

    retryWithExponentialBackoff(func, 0, cb);

    // 初回（0ms）
    jest.runOnlyPendingTimers();
    expect(func).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(false);
  });
});

