// Infinite currying function that sums all arguments until no argument is provided
function infiniteCurrySum(initialValue) {
  // Return a function that will either:
  // - Continue currying if another argument is provided
  // - Return the accumulated sum if no argument is provided
  return function(nextValue) {
    // Check if nextValue is undefined (no argument provided)
    if (nextValue === undefined) {
      // Base case: return the accumulated value
      return initialValue;
    } else {
      // Recursive case: return a new curried function with updated value
      // This creates a closure that remembers the current sum
      return infiniteCurrySum(initialValue + nextValue);
    }
  };
}

// ✅ Usage examples:
console.log(infiniteCurrySum(1)(2)(3)(4)());       // Output: 10
console.log(infiniteCurrySum(5)(10)(15)());        // Output: 30
console.log(infiniteCurrySum(100)());              // Output: 100

/* 
Uses closures to maintain state between function calls
Relies on recursion to build the chain of functions
The "termination condition" is when no argument is provided
Extremely flexible - can be called with any number of arguments in any sequence

This pattern is useful for creating flexible APIs that can handle variable input
Building flexible APIs
Creating mathematical operations that can be chained
Functional programming compositions
Partial application scenarios
*/