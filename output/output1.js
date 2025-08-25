const obj1 = {
    name:'hitesh',
    id:100
}
const arr1 = [1,2]

//obj1.self = obj1;
console.log(obj1)
console.log(JSON.stringify(obj1))
console.log(typeof obj1, typeof arr1, typeof Symbol())
console.log(Object.prototype.toString.call(obj1) );
console.log(Object.prototype.toString.call(arr1) );
console.log(Object.prototype.toString.call(new Date()) );
console.log(Object.prototype.toString.call(function(){}) );
console.log(Object.prototype.toString.call(Symbol() ) );

console.log(123213.354.toLocaleString('en-us',{style:'currency',currency:'USD',maximumFractionDigits:2}))

console.log(obj1.toString());
console.log(JSON.stringify(obj1))
const map = new Map();

map.set(obj1,'value');

console.log(map.get({
    name:'hitesh',
    id:100
}))

