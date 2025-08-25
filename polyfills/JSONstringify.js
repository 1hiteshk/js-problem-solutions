function JSONStringify(val) {
    // A Set to keep track of objects we've already visited
    // This helps detect circular references (object refers to itself).
    const seen = new Set();

    // Inner recursive function to handle different types
    function stringify(val) {

        // Case 1: null
        if (val === null) return 'null';

        // Case 2: strings → wrap in double quotes
        if (typeof val === 'string') return `"${val}"`;

        // Case 3: numbers & booleans → just convert to string
        if (typeof val === 'number' || typeof val === 'boolean') return String(val);

        // Case 4: functions & undefined → not valid in JSON, return undefined
        if (typeof val === 'function' || typeof val === 'undefined') return undefined;

        // Case 5: Arrays
        // - Map over each item
        // - Recursively stringify it
        // - If result is undefined (like when item is a function), replace with "null"
        if (Array.isArray(val)) {
            return `[${val.map((item) => {
                const str = stringify(item);
                return str === undefined ? 'null' : str;
            }).join(",")}]`;
        }

        // Case 6: Objects
        if (typeof val === 'object') {
            // If we've already seen this object, it means it's circular → throw error
            if (seen.has(val)) throw new TypeError("Converting circular structure to JSON");
            seen.add(val);

            // Convert each key-value pair
            const props = Object.entries(val) // [[key, value], [key, value]...]
                .map(([k, v]) => {
                    const strVal = stringify(v); // recursively stringify value
                    if (strVal === undefined) return undefined; // skip undefined values (like JSON does)
                    return `"${k}":${strVal}`; // format as "key":value
                })
                .filter(Boolean); // remove undefined entries

            seen.delete(val); // cleanup so the same object can appear in different branches
            return `{${props.join(",")}}`; // join props into JSON object string
        }

        // Any other type (symbol, bigint, etc.) → not supported
        return undefined;
    }

    // Start recursive stringification
    return stringify(val);
}

// Example usage:
console.log(JSONStringify("hello")); // -> "hello"

module.exports = JSONStringify;
