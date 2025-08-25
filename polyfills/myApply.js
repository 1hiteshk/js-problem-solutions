Function.prototype.myApply = function(context = {}, args = []) {
    if (typeof this !== 'function') {
        throw new Error('myApply should be called on a function',this);
    }
    
    const tempKey = Symbol();
    context[tempKey] = this;
    
    const result = context[tempKey](...args);
    delete context[tempKey];
    return result;
}

let obj = {
    city: 'Delhi'
}

function getCityName(country, cap) {
    return `${this.city} is ${cap} in ${country}`;
}

let res = getCityName.myApply(obj, ['India', 'capital']);
console.log(res);  // "Delhi is capital in India"
console.log(obj);  // {city: 'Delhi'} (no temporary property remains)