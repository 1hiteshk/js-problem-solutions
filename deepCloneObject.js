function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    let clone = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key]);
        }
    }
    return clone;
}

//For the purpose of user debugging.
const obj = { a: { b: { c: 3 } }, d: [4, 5] };
const res = deepClone(obj);
console.log(obj===res,"Deep Clone Result:", res);

module.exports = deepClone;