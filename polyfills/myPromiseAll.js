// Promise.myAll = 
function myPromiseAll(promises) {
    const results = new Array(promises.length);
    let completedPromisesIndex = 0;

    return new Promise((resolve, reject) => {
        if (promises.length === 0) return resolve([]); // handle empty input

        promises.forEach((p, i) => {
            Promise.resolve(p).then(res => {
                results[i] = res;
                completedPromisesIndex++;
                if (completedPromisesIndex === promises.length) {
                    resolve(results);
                }
            }).catch(reject); // catch(err => reject(err))
        });
    });
}


console.log(
    myPromiseAll([
        Promise.resolve('hello'),
        24, // non-promise values are wrapped in Promise.resolve()
        new Promise((resolve)=>setTimeout(()=>resolve(3000),3000)),
    //    new Promise((resolve,reject)=>setTimeout(()=>reject(new Error('Promise rejected')),0)),
        new Promise(resolve => setTimeout(resolve,1000,'1000s')),
        ])
        .then(res=>console.log(res))
        .catch(err=>console.log(err,'error occurred'))
    )
    
// Promise.all() in javascript is a static method on the Promise object.
// it takes an Promises array and returns a single promise that can:
// Resolve when all promises in the iterable array have resolved, with an array of their resolve values
// Rejects immediately if any promise rejects, with the reason of the first rejection

/* 
1. Array.prototype and Function.prototype
Arrays and functions are instance-based. When you create an array ([]) or function (function() {}),
 they inherit methods from their respective prototypes.

2. Promise (Static vs. Instance Methods)
Promises have both static and instance methods:

Static methods (attached to Promise constructor):

Promise.all(), Promise.race(), Promise.resolve(), etc.

These are called directly on Promise, not instances.
Promise.all([p1, p2]); // Static method

Instance methods (attached to Promise.prototype):

.then(), .catch(), .finally()
myPromise.then(...); // Instance method

Promise.myAll should be a static method (like the native Promise.all), 
so we attach it to Promise, not Promise.prototype.

Why the Difference?
Promise.all() is a utility that works on multiple promises, not a single instance. 
It doesn't make sense to call [p1, p2].all()—instead, we use Promise.all([p1, p2]).

Array.prototype/Function.prototype methods operate on a single instance (e.g., arr.map(), func.bind()). 
*/