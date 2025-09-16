import { wait, wait1, wait2, wait3, log, logA, logB, logC, errX, errY } from '../waitUtils.js';

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



async function h1_withTime() {
  try {
    await wait3();
    logAwithTime();
    await wait2();
    logBwithTime();
    await wait1();
    logCwithTime();
  } catch (e) {
    logwithTime(e.message);
  }
}

// console.log("h1 with time:");
// h1_withTime();


function h2_withTime() {
  // NOTE: h3 との比較用
  new Promise(() => {
    errXwithTime();
  }).catch((e) => logwithTime(e.message));
}

// console.log("h2 with time:");
// h2_withTime();



function h3_withTime() {
  // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
  new Promise(async () => {
    errXwithTime();
  }).catch((e) => logwithTime(e.message));
}

// console.log("h3 with time:");
// h3_withTime();

async function h4_withTime() {
  // NOTE: 2つの例外は両方 catch できるか？
  try {
    const p1 = wait2().then(() => {
      errXwithTime();
    });
    const p2 = wait1().then(() => {
      errYwithTime();
    });
    await p1;
    await p2;
  } catch (e) {
    logwithTime(e.message);
  }
}

// console.log("h4 with time:");
// h4_withTime();

console.log("h4 with time:");
h4_withTime();