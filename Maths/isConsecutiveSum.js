function isSumOfConsecutive(n) {
  // first handling edge cases and negatives
  if (n < 1 || n === 1) return false;
  // sum of k consecutive integers starting from x:
  // x + (x+1) + (x+2) + ... + (x+k-1) = k *(2x +k -1)/2 = n
  // use formula: x = (n - k * (k - 1) / 2) / k
  // if x is positive  integer return true

  for (let k = 2; k * (k + 1) / 2 <= n; k++){
    const numerator = n - (k * (k - 1)) / 2;
    if (numerator % k === 0) {
      return true;
    }
  }
  return false;

// Brute force
//   for (let start = 1; start <= n / 2; start++){
//     let sum = 0;
//     for (let i = start; sum < n; i++){
//       sum += i;
//       if (sum === n) return true;
//     }
//   }
//   return false;
}

module.exports = { isSumOfConsecutive };