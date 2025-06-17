// Object.assign()と等価な関数 assign()
export function assign(target, ...sources) {
  if (target === null || target === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  const result = Object(target);

  for (const source of sources) {
    if (source !== null && source !== undefined) {
      for (const key of Object.keys(source)) {
        result[key] = source[key];
      }
      for (const symbol of Object.getOwnPropertySymbols(source)) {
        const descriptor = Object.getOwnPropertyDescriptor(source, symbol);
        if (descriptor.enumerable) {
          result[symbol] = source[symbol];
        }
      }
    }
  }

  return result;
}