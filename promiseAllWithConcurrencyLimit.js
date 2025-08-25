// Executes an array of promise-returning functions with a concurrency limit
function promiseAllWithConcurrencyLimit(functions, limit) {
  // If no functions are provided, return a resolved promise with an empty array
  if (functions.length === 0) return Promise.resolve([]);

  const concurrencyLimit = Math.min(limit, functions.length); // limit can't exceed total functions
  const results = new Array(functions.length); // Array to store results by index
  let nextPromiseIndex = 0; // Points to the next function to execute
  let completedPromises = 0; // Count of completed promises

  return new Promise((resolve, reject) => {
    // Recursive async function to execute each promise
    async function executeNextPromise() {
      const currentIndex = nextPromiseIndex++; // Reserve the current index for this execution

      try {
        const result = await functions[currentIndex](); // Await the function's promise
        results[currentIndex] = result; // Store the result at its index
        completedPromises++; // Increment completed count

        // If all functions are complete, resolve the outer promise
        if (completedPromises === functions.length) {
          resolve(results);
          return;
        }

        // If more functions remain, schedule the next
        if (nextPromiseIndex < functions.length) {
          executeNextPromise();
        }
      } catch (error) {
        // Reject on first encountered error
        reject(error);
      }
    }

    // Launch the initial batch of executions up to the concurrency limit
    for (let i = 0; i < concurrencyLimit; i++) {
      executeNextPromise();
    }
  });
}

// Example usage: must pass an array of functions that return promises
promiseAllWithConcurrencyLimit(
  [
    () => new Promise((resolve) => setTimeout(() => resolve(1), 5000)),
    () => new Promise((resolve) => setTimeout(() => resolve(2), 1000)),
    () => new Promise((resolve) => setTimeout(() => resolve(3), 100)),
    () => new Promise((resolve) => setTimeout(() => resolve(4), 5000)),
    () => new Promise((resolve) => setTimeout(() => resolve(5), 3000)),
  ],
  2
)
  .then(console.log)
  .catch(console.error);

module.exports = promiseAllWithConcurrencyLimit;
