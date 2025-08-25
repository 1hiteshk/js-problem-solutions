/* 🔁 Why This Works:
Uses closure to keep county private

counter() increments and returns

counter.reset() is a method added to the function object */

// Define 'count' as an IIFE (Immediately Invoked Function Expression)
const count = (function () {
  let county = 0; // private variable to store the count, only accessible inside closure

  // Define the main counter function
  function counter() {
    return ++county; // increment and return the updated count
  }

  // Add a reset method to the counter function
  counter.reset = function () {
    county = 0; // reset count to 0
  };

  return counter; // return the counter function with attached reset method
})();

// === Usage ===

console.log(count()); // 1 → increments and returns 1
console.log(count()); // 2 → increments and returns 2
console.log(count()); // 3 → increments and returns 3

count.reset(); // resets internal count to 0

console.log(count()); // 1 → starts again from 1
console.log(count()); // 2 → increments and returns 2