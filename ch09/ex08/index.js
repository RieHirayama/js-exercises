export const State = Object.freeze({
  NORMAL: "normal",
  ALARM_SET: "alarmSet",
  ALARM_SOUNDING: "alarmSounding",
  SNOOZING: "snoozing",
});

export const Action = Object.freeze({
  NONE: "none",
  SOUND_ALARM: "soundAlarm",
  STOP_ALARM: "stopAlarm",
});

// イベント関数：状態とイベントを受け取り、[次の状態, アクション] を返す

export function setAlarm(state) {
  if (state === State.NORMAL) return [State.ALARM_SET, Action.NONE];
  return [state, Action.NONE];
}

export function cancelAlarm(state) {
  switch (state) {
    case State.ALARM_SET:
    case State.SNOOZING:
      return [State.NORMAL, Action.NONE];
    case State.ALARM_SOUNDING:
      return [State.NORMAL, Action.STOP_ALARM];
    default:
      return [state, Action.NONE];
  }
}

export function reachedToAlarmTime(state) {
  if (state === State.ALARM_SET) {
    return [State.ALARM_SOUNDING, Action.SOUND_ALARM];
  }
  return [state, Action.NONE];
}

export function snooze(state) {
  if (state === State.ALARM_SOUNDING) {
    return [State.SNOOZING, Action.STOP_ALARM];
  }
  return [state, Action.NONE];
}

export function elapseSnoozeTime(state) {
  if (state === State.SNOOZING) {
    return [State.ALARM_SOUNDING, Action.SOUND_ALARM];
  }
  return [state, Action.NONE];
}