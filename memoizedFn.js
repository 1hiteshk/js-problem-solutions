// memoize.js

// This function takes another function 'fn' and returns a memoized version of it
function memoize(fn) {
  const cache = new Map(); // Create a cache to store results

  return function (...args) {
    // Convert arguments to a key string, e.g., [2, 3] => "2,3"
    const key = args.toString();

    if (cache.has(key)) {
      // If result for these arguments is already in cache, return it
      console.log(`Fetching from cache for args: ${key}`);
      return cache.get(key);
    }

    // If result is not in cache, call the original function
    const result = fn(...args);
    cache.set(key, result); // Store result in cache for future calls

    console.log(`Computing result for args: ${key}`);
    return result;
  };
}

// Example usage: create a simple add function
function add(a, b) {
  return a + b;
}

const multiply = (a,b) => a * b; 

// Memoize the add function
const memoizedAdd = memoize(add);
const memoizedMultiply = memoize(multiply);
// These calls demonstrate memoization
console.log(memoizedAdd(2, 3)); // Computes and returns 5
console.log(memoizedAdd(2, 3)); // Returns 5 from cache
console.log(memoizedAdd(4, 1)); // Computes and returns 5
console.log(memoizedAdd(4, 1)); // Returns 5 from cache
