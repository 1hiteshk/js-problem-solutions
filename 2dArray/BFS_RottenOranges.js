function orangesRotting(grid) {
  // Guard against empty/invalid inputs
  if (!grid || grid.length === 0 || !grid[0] || grid[0].length === 0) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0].length;

  let fresh = 0;        // number of fresh oranges (1's)
  const queue = [];     // positions of all rotten oranges (2's) to start BFS
  let minutes = 0;      // how many minutes have elapsed

  // STEP 1: Scan the grid once.
  // - Count fresh oranges.
  // - Enqueue positions of all initially rotten oranges (multi-source BFS).
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }

  // If there are no fresh oranges to begin with, no time is needed.
  if (fresh === 0) return 0;

  // Directions for 4-neighbors: right, down, up, left
  const directions = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  // STEP 2: BFS level-by-level.
  // Each level represents "one minute" of rotting spread.
  while (queue.length > 0 && fresh > 0) {
    let len = queue.length; // process exactly the current layer (all cells rotten at this minute)

    while (len-- > 0) {
      const [r, c] = queue.shift(); // take one currently-rotten orange

      // Try to infect each neighbor
      for (const [dr, dc] of directions) { // directions row column offset
        const nr = r + dr; // next row  (nr = next row)
        const nc = c + dc; // next col  (nc = next col)

        // Bounds check + must be a fresh orange to infect
        if (
          nr >= 0 && nr < rows &&
          nc >= 0 && nc < cols &&
          grid[nr][nc] === 1
        ) {
          grid[nr][nc] = 2;      // fresh -> rotten
          queue.push([nr, nc]);  // it will spread further in the *next* minute
          fresh--;               // one fewer fresh orange remains
        }
      }
    }

    // Finished one full "minute" layer
    minutes++;
  }

  // If any fresh remain, they were unreachable -> impossible
  return fresh === 0 ? minutes : -1;
}

// Example
console.log(
  orangesRotting([
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1],
  ])
); // -> 4
