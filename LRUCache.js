// NODE {
//     next : Node | null
//     prev : Node | null
//     value : value
// }
// Each node represents a cache entry and holds key, value, and pointers to prev and next nodes.

class LRUCache {
  constructor(capacity) {
    this.capacity = Number(capacity); // Maximum capacity of the cache
    this.map = new Map(); // Map from key to node reference
    this.head = null; // Most recently used (MRU) node
    this.tail = null; // Least recently used (LRU) node
    this.length = 0; // current length of cache
  }

  // Removes a node from the doubly linked list
  #removeNode(node) {
    if (node.prev) {
      node.prev.next = node.next; // Bypass current node
    }
    /*   When removing a node from a doubly linked list, this line ensures that:
If node has a next neighbor,
then that next node's prev pointer is updated to skip over node and point to node.prev.
 */
    if (node.next) {
      node.next.prev = node.prev;
    }
    if (node === this.head) {
      this.head = node.next; // Update head if needed
    }
    if (node === this.tail) {
      this.tail = node.prev; // Update tail if needed
    }
    this.length -= 1; // Decrement cache size
  }

  // Inserts a node at the front (MRU position) of the list
  #addNodeAtHead(node) {
    node.prev = null;
    node.next = this.head; // Links the new node to point forward to the current head.
    if (this.head) this.head.prev = node; // If a head node exists, update its prev to point back to the new node.
    this.head = node; // Make the new node the new head of the list.
    // If cache was empty, set tail to this node too
    if (this.tail === null) this.tail = node;
    this.length += 1; // Increment cache size
  }

  // Fetches the value for a key and updates its position to MRU
  get(key) {
    if (!this.map.has(key)) return null;
    const node = this.map.get(key);

    // Move node to front (MRU)
    this.#removeNode(node);
    this.#addNodeAtHead(node);

    return node.value; // Return cached value
  }

  // Inserts or updates a key-value pair
  put(key, value) {
    // if key is already there
    // remove the existing node
    // create a new node
    // add it to head

    // case : if the key is already in cache store, If key already exists, remove the old node
    if (this.map.has(key)) {
      // 1. Remove the older node
      const oldNode = this.map.get(key);
      this.#removeNode(oldNode);
    } else if (this.length === this.capacity) {
      // check if we have capacity,  If at capacity, remove the LRU node
      this.map.delete(this.tail.key); // Removes the key from the hash map, so future get(key) won't return a stale node.
      this.#removeNode(this.tail); // Removes the node from the doubly linked list, so it's no longer in the usage order.
    }

    const node = {
      next: this.head,
      prev: null,
      key,
      value,
    };

    this.#addNodeAtHead(node);
    this.map.set(key, node); // Update map with new node
    // The map stores key → node lookups for fast access.
  }

  debug() {
    let current = this.head;
    const arr = [];

    while (current !== null) {
      arr.push(current);
      current = current.next;
    }

    return arr.reduce(
      (acc = "", curr) =>
        acc.concat(`-->[ [${curr.key}]: [${curr.value}] ]-->`),
      ""
    );
  }
}

const cache = new LRUCache(3);

cache.put(1, 10); // Cache: 1
cache.put(2, 20); // Cache: 2 <-> 1
cache.put(3, 30); // Cache: 3 <-> 2 <-> 1
cache.put(4, 40); // Cache: 4 <-> 3 <-> 2 (1 is evicted)

console.log(cache.debug());

/* Map:
{
  1 → [Node_1],
  2 → [Node_2],
  3 → [Node_3]
}
head → [Node_3] ⇄ [Node_2] ⇄ [Node_1] ← tail
         (MRU)                    (LRU)
 */
