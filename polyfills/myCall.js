Function.prototype.myCall = function(context={},...args){
    if(typeof this !== 'function'){
        throw new Error('myCall should be called on function',this)
    }
    
    const tempKey = Symbol();
    context[tempKey] = this;
    
    
        const result = context[tempKey](...args);
        delete context[tempKey];
        return result;
    
}

let obj = {
    city:'Delhi'
}
function getCityName(country,cap){
    return `${this.city} is ${cap} in ${country}`;
}
let res = getCityName.myCall(obj,'India','agra');
console.log(res)
console.log(obj)