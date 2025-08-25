const arr = [1, 2, 3, 4, 5];

// const newArray = arr.map((i) => {
//   return i * i;
// });

// console.log(newArray);

Array.prototype.myMap = function (cb) {
  const arr = this;
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(cb(arr[i], i));
  }
  return result;
};

const newArray2 = arr.myMap((i) => {
  return i * 2;
});

console.log(newArray2);