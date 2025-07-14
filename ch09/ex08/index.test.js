import {
  State,
  Action,
  setAlarm,
  cancelAlarm,
  reachedToAlarmTime,
  snooze,
  elapseSnoozeTime,
} from "./index.js";

describe("目覚まし時計の状態遷移", () => {
  test("NORMAL → アラーム設定 → ALARM_SET", () => {
    expect(setAlarm(State.NORMAL)).toEqual([State.ALARM_SET, Action.NONE]);
  });

  test("ALARM_SET → アラーム解除 → NORMAL", () => {
    expect(cancelAlarm(State.ALARM_SET)).toEqual([State.NORMAL, Action.NONE]);
  });

  test("ALARM_SET → 時刻到達 → ALARM_SOUNDING + アラーム鳴動", () => {
    expect(reachedToAlarmTime(State.ALARM_SET)).toEqual([State.ALARM_SOUNDING, Action.SOUND_ALARM]);
  });

  test("ALARM_SOUNDING → アラーム解除 → NORMAL + アラーム停止", () => {
    expect(cancelAlarm(State.ALARM_SOUNDING)).toEqual([State.NORMAL, Action.STOP_ALARM]);
  });

  test("ALARM_SOUNDING → スヌーズ → SNOOZING + アラーム停止", () => {
    expect(snooze(State.ALARM_SOUNDING)).toEqual([State.SNOOZING, Action.STOP_ALARM]);
  });

  test("SNOOZING → アラーム解除 → NORMAL", () => {
    expect(cancelAlarm(State.SNOOZING)).toEqual([State.NORMAL, Action.NONE]);
  });

  test("SNOOZING → スヌーズ時間経過 → ALARM_SOUNDING + アラーム再鳴動", () => {
    expect(elapseSnoozeTime(State.SNOOZING)).toEqual([State.ALARM_SOUNDING, Action.SOUND_ALARM]);
  });

  test("不正なイベント → 状態変化なし", () => {
    expect(setAlarm(State.ALARM_SET)).toEqual([State.ALARM_SET, Action.NONE]);
    expect(cancelAlarm(State.NORMAL)).toEqual([State.NORMAL, Action.NONE]);
    expect(reachedToAlarmTime(State.NORMAL)).toEqual([State.NORMAL, Action.NONE]);
    expect(snooze(State.SNOOZING)).toEqual([State.SNOOZING, Action.NONE]);
    expect(elapseSnoozeTime(State.NORMAL)).toEqual([State.NORMAL, Action.NONE]);
  });
});
