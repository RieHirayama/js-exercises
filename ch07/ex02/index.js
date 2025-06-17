export function fizzbuzz(n) {
  Array.from({ length: n }, (_, i) => i + 1).forEach(i =>
    console.log(
      i % 15 === 0 ? "FizzBuzz" :
      i % 3 === 0 ? "Fizz" :
      i % 5 === 0 ? "Buzz" :
      i
    )
  );
}

export function sumOfSquaredDifference(f, g) {
  return f.map((val, i) => (val - g[i]) ** 2).reduce((sum, v) => sum + v, 0);
}

export function sumOfEvensIsLargerThan42(array) {
  return array.filter(v => v % 2 === 0).reduce((sum, v) => sum + v, 0) >= 42;
}