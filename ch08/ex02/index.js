export function power(x, n) {
  if (n === 0) return 1;
  if (n % 2 === 0) {
    const half = power(x, n / 2);
    return half * half;
  } else {
    return x * power(x, n - 1);
  }
}