Array.prototype.myReduce = function(cb, initialValue) {
    if (typeof cb !== "function") {
        throw new Error("Callback must be a function");
    }
    const arr = this;
    let acc = initialValue;
    let startIndex = 0;
    if(acc === undefined) {
        acc = arr[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < arr.length; i++) {
        if (i in arr) { // Check if the index exists in the array
            acc = cb(acc, arr[i], i, arr);
        }
    }
    return acc;
};

const res = [1, 2, 3].myReduce((acc, val) => acc + val, 4); // Output: 10
console.log(res);