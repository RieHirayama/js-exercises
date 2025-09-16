import { wait, wait1, wait2, wait3, log, logA, logB, logC, errX, errY } from '../waitUtils.js';

function f10() {
  // NOTE: then(r, c) と then(r).catch(c) は等しいか？
  wait1()
    .then(() => 42)
    .then(errY, (e) => log(e.message))
    .finally(logA);
}

// console.log("f10:");
// f10();

const start = Date.now();
const logwithTime = (v) => { 
  log(v); 
  console.log(`  (${((Date.now() - start) / 1000).toFixed(2)}s 経過)`); 
};
const logAwithTime = () => { 
  logA(); 
  console.log(`  (${((Date.now() - start) / 1000).toFixed(2)}s 経過)`); 
};
const logBwithTime = () => { 
  logB(); 
  console.log(`  (${((Date.now() - start) / 1000).toFixed(2)}s 経過)`); 
};
const logCwithTime = () => { 
  logC(); 
  console.log(`  (${((Date.now() - start) / 1000).toFixed(2)}s 経過)`); 
};
const errXwithTime = () => { 
  errX(); 
  console.log(`  (${((Date.now() - start) / 1000).toFixed(2)}s 経過)`); 
};
const errYwithTime = () => { 
  errY(); 
  console.log(`  (${((Date.now() - start) / 1000).toFixed(2)}s 経過)`); 
};
function f10_withTime() {
  // NOTE: then(r, c) と then(r).catch(c) は等しいか？
  wait1()
    .then(() => 42)
    .then(errYwithTime, (e) => logwithTime(e.message))
    .finally(logAwithTime);
}

console.log("f10 with time:");
f10_withTime();