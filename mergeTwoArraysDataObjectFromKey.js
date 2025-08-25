/* 
The mergeData function merges two arrays of objects (arr1 and arr2) based on the id property.
If both arrays contain an object with the same id, their properties are combined 
(with arr2 overriding any overlapping properties from arr1). 
If the id is unique to one array, it is simply added to the result.
merge_array_objects_by_id.js
mergeTwoArraysDataObjectFromKey.js
*/

// Merges two arrays of objects by their 'id' key
function mergeData(arr1, arr2) {
    const map = new Map(); // Map to store merged data with 'id' as key

    // First, add all items from arr1 to the map
    for (let item of arr1) {
        // Clone the item to avoid mutating the original
        map.set(item.id, { ...item });
    }

    // Now iterate through arr2 and merge or add new entries
    for (let item of arr2) {
        if (map.has(item.id)) {
            // Merge the properties, values from arr2 will override arr1 on conflict
            map.set(item.id, { ...map.get(item.id), ...item });
        } else {
            // If id is new, simply add the item
            map.set(item.id, { ...item });
        }
    }

    // Debug: Log all merged map values
    console.log(map.values());

    // Convert map values back to an array and return
    return Array.from(map.values());
}

// Example usage for debugging
console.log(
    mergeData(
    [{ id: 1, name: 'hitu' }, { id: 2, name: 'ritu' },{ id: 3, age: '22' }],
    [{ id: 3, name: 'pitu' }, { id: 4, age: '23' }]
)
);

// Exporting the function for external usage (e.g., in Node.js)
module.exports = mergeData;
