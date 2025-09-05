function isPowerOfFour(n) {
  // your function implementation
  if (n <= 0) return false;
  // Powers of 4 in binary:
  // A power of Four has only one bit set AND that bit must be at even position
  // 1 = 0001 (bit at position 0 - even)
  // 4 = 0100 (bit at position 2 - even)
  // 16 = 00010000 (bit at position 4 - even)
  // 64 = 01000000 (bit at position 6 - even)

  //3. Implement Bit Manipulation
  // Use bitwise operations to check both conditions: power of 2 AND even bit position

  // check if n is a power of 2: (n & (n-1)) ===0 AND
  // check if the bit is at even position: (n & 0x55555555) !==0
  return n > 0 && (n & (n - 1)) === 0 && (n & 0x55555555) !== 0;

  // OR log method
  // const logRes = Math.log10(n) / Math.log10(4);
  // return Number.isInteger(logRes)

  // OR Division method
  // while(n%4===0){
  //   n = n/4 }
  // return n===1;
}

module.exports = { isPowerOfFour };
