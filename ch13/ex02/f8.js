import { wait, wait1, wait2, wait3, log, logA, logB, logC, errX, errY } from '../waitUtils.js';

function f8() {
  // NOTE: f9, f10 との比較用
  wait1()
    .then(errX)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

// console.log("f8:");
// f8();

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
function f8_withTime() {
  // NOTE: f9, f10 との比較用
  wait1()
    .then(errXwithTime)
    .then(errYwithTime)
    .catch((e) => logwithTime(e.message))
    .finally(logAwithTime);
}

console.log("f8 with time:");
f8_withTime();