function compressString(s) {
  if (!s) return "";

  let result = "";
  let count = 1;
  for (let i = 1; i <= s.length; i++){
    if (s[i] === s[i - 1]) {
      count++;
    } else {
      // for counts > 9, split into chunks of 9
      while (count > 9) {
        result += s[i - 1] + '9';
        count -= 9;
      }
      if (count === 1) { // new start or more than 9 only two cases
        // check if previous splitting happened (means count was reduced)
        // we can detect that if result ends with tha same char + '9' chunk, so check the last chars
        let lastNineChunk = result.endsWith(s[i - 1] + '9');
        if (lastNineChunk) {
          // append '1' for leftover 1 after splitting
          result += s[i - 1] + '1';
        } else {
          // normal single char with count 1, append only new char
          result += s[i - 1];
        }
      } else {
        // count > 1 append char + count 
        result += s[i - 1] + count;
      }
      count = 1; // reset count for next character
      // if we reach the end of the string, we need to append the last character
    }
  }
  return result;
}

console.log(compressString("aaabbbcccccccccccd"));
// Output: "a3b3c9d1"

