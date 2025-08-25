// word_search_trie.js

class TrieNode {
  constructor() {
    this.children = {};
    this.word = null;
  }
}

function findWords(board, words) {
  if (!board || board.length === 0 || !board[0] || !words || words.length === 0) {
    return [];
  }

  const root = new TrieNode();
  for (const word of words) {
    let node = root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.word = word;
  }

  const result = new Set();
  const rows = board.length;
  const cols = board[0].length;
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
    [-1, -1], [-1, 1], [1, -1], [1, 1]
  ];

  function backtrack(r, c, node) {
    const char = board[r][c];
    const nextNode = node.children[char];
    if (!nextNode) return;

    if (nextNode.word) {
      result.add(nextNode.word);
      nextNode.word = null; // Avoid duplicates
    }

    board[r][c] = '#';

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 && nr < rows &&
        nc >= 0 && nc < cols &&
        board[nr][nc] !== '#'
      ) {
        backtrack(nr, nc, nextNode);
      }
    }

    board[r][c] = char;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (root.children[board[r][c]]) {
        backtrack(r, c, root);
      }
    }
  }

  return Array.from(result);
}



const board = [
  ['o', 'a', 'a', 'n'],
  ['e', 't', 'a', 'e'],
  ['i', 'h', 'k', 'r'],
  ['i', 'f', 'l', 'v']
];
const words = ["oath", "pea", "eat", "rain"];

findWords(board, words)

module.exports = { findWords };
