function decodeSecretCode(s) {
  // your solution
  if (!s || s.length == 0 || s.length % 2 !== 0) return '';
  let chars = [];
  let nums = [];
  let result=''
  for (let i = 0; i < s.length; i++){
    const letter = s[i];
    const shift = parseInt(s[i + 1]);

    // Check if current character is a letter
    if (letter >= 'a' && letter <= 'z') {
      // calculate new character code
      const newCharCode = letter.charCodeAt(0) + shift;
      result += String.fromCharCode(newCharCode)
    }
  }

  return result;
}

module.exports = { decodeSecretCode };