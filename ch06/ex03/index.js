let o = {};
o.x = 1;

let p = Object.create(o);
p.y = 2;

let q = Object.create(p);
q.z = 3;

console.log(o.isPrototypeOf(p)); // => true
console.log(o.isPrototypeOf(q)); // => true
console.log(p.isPrototypeOf(q)); // => true

// Object
console.log(Object.prototype.isPrototypeOf({})); // true

// Array
const arr = [];
console.log(Array.prototype.isPrototypeOf(arr));    // true
console.log(Object.prototype.isPrototypeOf(arr));   // true

// Date
const date = new Date();
console.log(Date.prototype.isPrototypeOf(date));    // true
console.log(Object.prototype.isPrototypeOf(date));  // true

// Map
const map = new Map();
console.log(Map.prototype.isPrototypeOf(map));      // true
console.log(Object.prototype.isPrototypeOf(map));   // true
