function customAssign(target, ...sources) {
    // 🚫 Throws error if target is null or undefined (not coercible to object)
    if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    // 🧱 Ensures target is treated as an object (handles primitives like string/number)
    const to = Object(target);

    // 🔁 Iterates over all source objects
    for (const source of sources) {
        // ⛔ Skip null or undefined sources
        if (source === null || source === undefined) continue;

        // 🔁 Iterates over all enumerable properties in source
        for (const key in source) {
            // ✅ Copies only *own* properties (ignores inherited props)
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                to[key] = source[key];
            }
        }
    }

    // ✅ Returns the merged result object
    console.log(to);
    return to;
}
// Merges second object into the first
customAssign({ b: 9 }, { k: 0 });  // ➜ { b: 9, k: 0 }
customAssign({ b: 9 }, { k: 0 },{d:6});  // ➜ { b: 9, k: 0, d:6 }
customAssign({ a: 1 }, null);       // ✅ Returns { a: 1 }
customAssign({}, Object.create({x: 1}));  // ✅ Doesn't copy `x`, it's inherited
customAssign({ a: 1 }, { b: 2, c: 3 }); // ➜ { a: 1, b: 2, c: 3 }
customAssign(null, { a: 1 });       // ❌ Throws TypeError
module.exports = customAssign;