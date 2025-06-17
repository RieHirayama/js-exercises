
// 非破壊的 pop（最後を除いた新しい配列）
export function pop(array) {
  return array.slice(0, -1);
}

// 非破壊的 push（末尾に追加された新しい配列）
export function push(array, value) {
  return [...array, value];
}

// 非破壊的 shift（先頭を除いた新しい配列）
export function shift(array) {
  return array.slice(1);
}

// 非破壊的 unshift（先頭に追加された新しい配列）
export function unshift(array, value) {
  return [value, ...array];
}

// 非破壊的 sort（並べ替え済みの新しい配列）
export function sort(array, compareFn) {
  return [...array].sort(compareFn);
}