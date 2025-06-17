// 挿入ソートの実装
function sort(
  array,
  compare = (lhs, rhs) => (lhs < rhs ? -1 : lhs > rhs ? +1 : 0)
) {
  // array[0 ... i-1] が常にソート済みになるように処理を進める
  // (0 <= j < i-1 に対して compare(array[j], array[j + 1]) <= 0 が成り立つ)
  for (let i = 1; i < array.length; i++) {
    const v = array[i];

    // array[i] を array[0 ... i] の適切な場所に挿入する
    let j = i;
    while (j > 0 && compare(array[j - 1], v) > 0) {
      array[j] = array[j - 1];
      j--;
    }
    array[j] = v;
  }
  return array;
}

// マージソードの実装
export function mergeSort(array, compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {
  if (array.length <= 1) return array;

  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid), compare);
  const right = mergeSort(array.slice(mid), compare);

  return merge(left, right, compare);
}

function merge(left, right, compare) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (compare(left[i], right[j]) <= 0) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i), right.slice(j));
}


const numbers = [10, 6, 7, 1, 9, 2, 3, 4, 5, 8];
console.log("挿入ソートの結果:", sort(numbers)); 
console.log("マージソートの結果:", mergeSort(numbers)); 

const words = ['d', 'a', 'c', 'e', 'b'];
console.log("挿入ソートの結果:", sort(words)); 
console.log("マージソートの結果:", mergeSort(words)); 

// 実行結果
// 挿入ソートの結果: [
//   1, 2, 3, 4,  5,
//   6, 7, 8, 9, 10
// ]
// マージソートの結果: [
//   1, 2, 3, 4,  5,
//   6, 7, 8, 9, 10
// ]
// 挿入ソートの結果: [ 'a', 'b', 'c', 'd', 'e' ]
// マージソートの結果: [ 'a', 'b', 'c', 'd', 'e' ]