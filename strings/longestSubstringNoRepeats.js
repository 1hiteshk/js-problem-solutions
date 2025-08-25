// path: algorithms/strings/lengthOfLongestSubstring.js

/**
 * Returns the length of the longest substring without repeating characters.
 * Sliding-window over the string while maintaining a Set of characters in the current window.
 *
 * Time:  O(n) — each index enters and leaves the window at most once.
 * Space: O(min(n, k)) — up to size of the character alphabet used in `s`.
 *
 * Caveat: operates on JavaScript UTF-16 code units; complex emoji/graphemes may count as multiple.
 */
function lengthOfLongestSubstring(s) {
  // Early exit to avoid unnecessary work for empty/invalid input.
  if (!s || s.length === 0) return 0;

  let maxLen = 0;             // Tracks the best (longest) unique-window length seen so far.
  const charSet = new Set();  // Holds characters currently inside the active window.
  let start = 0;              // Left boundary (inclusive) of the sliding window.

  // Expand the window by moving `end` to the right one step at a time.
  for (let end = 0; end < s.length; end++) {
    // If s[end] is already inside the window, shrink from the left until it's not.
    // Why: window must maintain the invariant "all characters are unique".
    while (charSet.has(s[end])) {
      charSet.delete(s[start]); // Remove the leftmost char; duplicates eventually get removed.
      start++;                  // Move left boundary rightwards to shrink the window.
    }

    charSet.add(s[end]);        // Safe to include the new rightmost char; window remains unique.

    // Update best answer using current window length `[start, end]` (inclusive range).
    maxLen = Math.max(maxLen, end - start + 1);
  }

  return maxLen;               // Longest unique substring length found.
}

// For quick manual debugging from CLI: `node algorithms/strings/lengthOfLongestSubstring.js`
if (require.main === module) {
  /*
    Example walk-through for "abcabcbb":
    - Grows to "abc" (len 3), then hits duplicate 'a'; shrinks past first 'a' and continues.
    - Never exceeds length 3; returns 3.
  */
  console.log(lengthOfLongestSubstring("abcabcbb")); // 3
}

module.exports = lengthOfLongestSubstring;
