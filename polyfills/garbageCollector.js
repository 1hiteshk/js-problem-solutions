/* 
Imagine your computer has a toy box (called a "graph") full of toys.
Each toy can point to other toys it’s connected to.
Now, you start playing with a few of them (called the roots). The idea is:
Keep only the toys you can actually reach from the ones you're playing with.
Throw the rest in the trash. (That's what "garbage collector" does.)

Approach
1. Use Depth First Search (DFS) starting from each root.
2. Maintain a Set of visited object IDs.
3. Traverse each object's references recursively.
4. Once traversal is complete, filter the original graph to keep only visited nodes.

Explanation
· We simulate how a garbage collector would identify memory still in use: 
Start from known roots (e.g., global variables or stack references). 
Traverse every reference recursively (like memory pointers). 
Mark visited nodes (reachable objects). 
Remove everything else (unreachable garbage).
*/

// This function throws away stuff (nodes) in a graph that can't be reached from certain starting points
function garbageCollector(graph, roots) {
    // This set will keep track of all the toys (nodes) we can reach
    const reachable = new Set();

    // This is a helper function to explore connected toys using DFS (like exploring through tunnels)
    function dfs(node) {
        // If this toy doesn't exist or we already visited it, stop
        if (!graph[node] || reachable.has(node)) return;

        // Mark this toy as visited
        reachable.add(node);

        // Now go check out all the toys this one is pointing to
        for (const neighbour of graph[node]) {
            dfs(neighbour); // Visit that toy too!
        }
    };

    // Start exploring from each root toy
    for (const root of roots) {
        dfs(root); // Dive into the graph from here
    }

    // Now let's make a new toy box only with the toys we actually played with
    const cleanedGraph = {};
    for (const node of reachable) {
        cleanedGraph[node] = graph[node]; // Keep this toy and its connections
    } 

    return cleanedGraph; // Give back the cleaned up toy box
}

// 🧪 Test it out with a sample toy box
// Graph: A → B → C, D is all alone
// Start from A, so we should throw D away!
console.log(
    garbageCollector({ A:['B'], B:['C'], C:[], D:[] }, ['A'])
);

// 📦 Export the function so other code can use it (Node.js style)
module.exports = garbageCollector;

graph = {
  A: ['B'],  // A is holding B
  B: ['C'],  // B is holding C
  C: [],     // C holds nothing
  D: []      // D is alone
}
roots = ['A']  // Start playing with toy A
// A → B → C are reachable, but D is not touched. So D goes to trash! 🗑️
/* Output: 
{
  A: ['B'],
  B: ['C'],
  C: []
} */
