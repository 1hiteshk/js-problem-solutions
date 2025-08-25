function computeAmount() {
  const amount = {
    total: 0,

    lacs(n) {
      this.total += n * 100000;
      return this;
    },

    crore(n) {
      this.total += n * 10000000;
      return this;
    },

    thousand(n) {
      this.total += n * 1000;
      return this;
    },

    value() {
      return this.total;
    }
  };

  return amount;
}

// Example usage
const result = computeAmount()
  .lacs(15)
  .crore(5)
  .crore(2)
  .lacs(20)
  .thousand(45)
  .crore(7)
  .value();

console.log(result); // 143545000

/* 
// Option 1: ES6 method shorthand (preferred)
lacs(n) { ... }

// Option 2: Classic function
lacs: function(n) { ... }

*/
