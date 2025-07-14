export function instanceOf(object, constructor) {
  if (object == null || typeof object !== "object") return false;

  let proto = Object.getPrototypeOf(object);
  const prototype = constructor.prototype;

  while (proto) {
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}