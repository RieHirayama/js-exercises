export function sum(array) {
  array = Array.isArray(array) ? array : [];
  return array.reduce((acc, val) => acc + val, 0);
}

export function join(array, separator = ',') {
  if (!Array.isArray(array)) {
    throw new TypeError('join: 配列が必要です');
  }
  return array.reduce(
    (acc, val, i) => i === 0 ? String(val ?? '') : acc + separator + String(val ?? ''),
    ''
  );
}

export function reverse(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('reverse: 配列が必要です');
  }
  return array.reduce((acc, val) => [val, ...acc], []);
}

export function every(array, predicate) {
  array = Array.isArray(array) ? array : [];
  return array.reduce((acc, val, i, arr) => acc && predicate(val, i, arr), true);
}

export function some(array, predicate) {
  array = Array.isArray(array) ? array : [];
  return array.reduce((acc, val, i, arr) => acc || predicate(val, i, arr), false);
}