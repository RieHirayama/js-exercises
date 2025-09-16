import { wait, wait1, wait2, wait3, log, logA, logB, logC, errX, errY } from '../waitUtils.js';

function f9() {
  // NOTE: f10 との比較用
  wait1()
    .then(() => 42)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

// console.log("f9:");
// f9();

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
function f9_withTime() {
  // NOTE: f10 との比較用
  wait1()
    .then(() => 42)
    .then(errYwithTime)
    .catch((e) => logwithTime(e.message))
    .finally(logAwithTime);
}

console.log("f9 with time:");
f9_withTime();