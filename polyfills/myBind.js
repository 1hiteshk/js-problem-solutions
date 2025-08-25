/* 
The built-in .bind() function:
Creates a new function where this is fixed (or "bound") to a specific object.
Also allows presetting arguments (partial application).
*/

let obj = {
  city: "Delhi",
};
function getCityName(country) {
  return `${this.city} is in ${country}`;
}

Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("myBind must be called on a function ", this);
  }

  const tempFnKey = Symbol(); // 💡 unique property name , unique key
  context[tempFnKey] = this; // Assign the function to be bound to a property on the context object
  //context.fn = this; // Assign the function to be bound to a property on the context object

  return function (...newArgs) {
    //const result = context.fn(...args, ...newArgs);
    const result = context[tempFnKey](...args, ...newArgs);

    delete context[tempFnKey]; // Clean up the temporary property
    return result;
  };
};

let result1 = getCityName.myBind(obj, "India")();

// obj.city = 'Mumbai'; with delete context.fn, wont allow to change in obj and this will not change the result
// clg(obj.fn()); // with delete fn will no longer be attached to obj, otherwise fn is still attached to obj
let result2 = getCityName.myBind(obj);
console.log(result1); // Output: "Delhi is in India"
console.log(result2("Bharat")); // Output: "Delhi is in Bharat"

console.log(obj.fn());

/* 
Definition: Invokes a function with a given this context and arguments passed individually.
func.call(thisArg, arg1, arg2, ...);

func.apply(thisArg, [arg1, arg2, ...]);
Definition: Invokes a function with a given this context and arguments passed as an array.

const boundFunc = func.bind(thisArg, arg1, arg2, ...);
Definition: Returns a new function with a permanently bound this context and optional preset arguments.
*/