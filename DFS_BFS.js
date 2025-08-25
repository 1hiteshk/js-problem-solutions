/* 
You want to find your lost toy in your house:
DFS: You go into one room and search every corner deeply before trying another room.
BFS: You peek into every room on the first floor before going upstairs.
Example Map (Tree)
        A
      /   \
     B     C
    / \     \
   D   E     F

| Search Type | How it Searches                   | Good For                 |
| ----------- | --------------------------------- | ------------------------ |
| DFS         | Go deep, then backtrack           | Searching paths, puzzles |
| BFS         | Check level by level (wide first) | Finding shortest path    |
*/

const tree = {
  value: 'A',
  children: [
    {
      value: 'B',
      children: [
        { value: 'D', children: [] },
        { value: 'E', children: [] },
      ],
    },
    {
      value: 'C',
      children: [
        { value: 'F', children: [] },
      ],
    },
  ],
};

// Depth First Search (DFS) - explore as deep as possible first
function dfs(node) {
  if (!node) return;

  console.log(node.value); // Visit the room, process the node

   // For every connected room (child), go deeper first
  for (let child of node.children) {
    dfs(child); // Go deep into each child (recursive DFS)
  }
};

// Breadth First Search (BFS) - explore level by level
function bfs(root) {
  let queue = [root]; // Start with a queue containing the root room

  while (queue.length > 0) {
    let node = queue.shift(); // Visit the first room in the queue
    console.log(node.value);

     // Add all directly connected rooms (children) to the queue
    for (let child of node.children) {
      queue.push(child); // Add connected rooms to the queue
    }
  }
};

console.log('DFS Order:');
dfs(tree);   // Output: A B D E C F

console.log('BFS Order:');
bfs(tree);   // Output: A B C D E F
/* 
🔹 1. BFS (Breadth-First Search)

Data structure used → Queue (FIFO: First In, First Out).
Reason: BFS explores level by level (neighbors first, then their children).
A queue ensures nodes are visited in the order they were discovered.

Steps (simplified):-
- Start with a root/starting node → push it into a queue.
- Pop from the front of the queue, process it.
- Push its unvisited neighbors into the queue.
- Repeat until the queue is empty.

👉 BFS guarantees shortest path in an unweighted graph.
 */

/* 
2. DFS (Depth-First Search)

Data structure used → Stack (LIFO: Last In, First Out).
Implementation options:
- Explicit Stack (iterative DFS).
- Call Stack (recursive DFS).

Reason: DFS goes deep first, meaning we always explore the latest discovered node until dead end,
 then backtrack.

Steps (simplified):-
- Start with a root/starting node → push it into a stack (or call recursively).
- Pop from stack / recursive call → process it.
- Push its unvisited neighbors into the stack (or recurse).
- `Repeat until the stack is empty (or recursion unwinds).

👉 DFS is useful for pathfinding, cycle detection, topological sort, etc.
*/

