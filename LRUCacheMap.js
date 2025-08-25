class LRUCache {
  // use a Map to maintain cache with order
  // Map keeps keys in insertion order
  // least recently used key is at the start
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value); // moves key to end
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey);
    }
  }
}

module.exports = LRUCache;

// .keys() returns an iterator over the keys of the Map.

//     Importantly, in JavaScript, a Map preserves insertion order(first -in, first - out).

// So the first key returned by.keys() will always be the oldest inserted key(i.e., the least recently used in this LRU cache logic).
// const map = new Map();
// map.set("a", 1);
// map.set("b", 2);
// map.set("c", 3);

// console.log(map.keys());
 // → MapIterator { 'a', 'b', 'c' }
// 2..next()

// Iterators don’t give you all items at once—you move step by step with .next().

// Each call to.next() gives an object like:
// { value: "a", done: false }
// Here:

// value is the current key.
// done is false until the iterator is exhausted.
// const iter = map.keys();
// console.log(iter.next()); // { value: 'a', done: false }
// console.log(iter.next()); // { value: 'b', done: false }
// 3..value

// Since.next() returns an object, we only need the value part, which is the actual key.

//     So.next().value gives you the first key inserted in the Map(the least recently used).

//     This line finds the oldest key in the Map using the iterator and removes it, keeping the cache within capacity.
// const lruKey = this.cache.keys().next().value;
// 👉 This grabs the least recently used key(the first one in the Map).
