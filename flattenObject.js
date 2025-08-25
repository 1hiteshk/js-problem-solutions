// Recursively flattens a nested object into a single-level object with dot-separated keys
function flattenObject(obj, parentKey = '', result = {}) {
  
  // Iterate over each key in the current object
  for (const key in obj) {
    // Ensure the key is not from the prototype chain
    if (obj.hasOwnProperty(key)) {
      
      // Construct the new key: dot notation if nested, else just key
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      const value = obj[key];

      // If value is a non-null object (and not an array), recurse into it
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        flattenObject(value, fullKey, result);  // recursive flatten
      } else {
        // Otherwise, add the key-value pair to the result
        result[fullKey] = value;
      }
    }
  }

  // Return the accumulated result
  return result;
}

// Example call for debugging purposes
console.log(flattenObject({"a":{"b":{"c":2},"d":3}}));
// Output: { 'a.b.c': 2, 'a.d': 3 }
console.log(flattenObject( {"a":{"b":{"c":2}},"d":3} ));
// Output: { 'a.b.c': 2, d: 3 }

// Export the function for usage in other files/modules
module.exports = flattenObject;


