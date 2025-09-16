import { wait, wait1, wait2, wait3, log, logA, logB, logC, errX, errY } from '../waitUtils.js';

function f4() {
  // NOTE: f5 との比較用
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then((value) =>
      wait(1000).then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}

// console.log("f4:");
// f4();

const start = Date.now();
const logwithTime = () => { 
  log(); 
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
function f4_withTime() {
  // NOTE: f5 との比較用
  wait2()
    .then(() => {
      logAwithTime();
      return 40;
    })
    .then((value) =>
      wait(1000).then(() => {
        logBwithTime();
        return 100;
      })
    )
    .then((v) => log(v));
}

console.log("f4 with time:");
f4_withTime();