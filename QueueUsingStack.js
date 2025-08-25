class QueueUsingStack {
    constructor() {
        // Stack to handle incoming elements (enqueue operations)
        this.inStack = [];
        // Stack to handle outgoing elements (dequeue operations)
        this.outStack = [];
    }
    // Enqueue: Push the value onto the inStack
    enqueue(value) {
        this.inStack.push(value);
    }
    // Dequeue: Remove and return the element at the front of the queue
    dequeue() {
        // If both stacks are empty, the queue is empty; return null
        if (this.isEmpty()) return null;
        // If outStack is empty, transfer all elements from inStack to outStack
        // This reverses the order to maintain FIFO
        if (this.outStack.length === 0) {
            while (this.inStack.length) {
                this.outStack.push(this.inStack.pop());
            }
        }
        // Pop the top of outStack, which represents the front of the queue
        return this.outStack.pop();
    }
    // Peek: Return the element at the front of the queue without removing it
    peek() {
        // If queue is empty, return null
        if (this.isEmpty()) return null;
        // If outStack is empty, move elements from inStack to outStack
        if (this.outStack.length === 0) {
            while (this.inStack.length) {
             this.outStack.push(this.inStack.pop());
           }
        }
        // Return the last element in outStack (the front of the queue)
        return this.outStack[this.outStack.length - 1];
    }
    // isEmpty: Check whether the queue is empty
    isEmpty() {
        // Queue is empty only if both stacks are empty
        return this.inStack.length === 0 && this.outStack.length===0
    }
}

module.exports = QueueUsingStack;

// A queue follows FIFO (First-In-First-Out) order, whereas a stack follows LIFO (Last-In-First-Out).

// To simulate a queue using two stacks:

// Use one stack (inStack) to handle enqueue (push) operations.

// Use another stack (outStack) to handle dequeue (pop) operations.

// When dequeuing or peeking, if outStack is empty, move all elements from inStack to outStack 
// (this reverses the order, restoring FIFO behavior).

const Queue = require('./QueueUsingStack');
const q = new Queue();

q.enqueue(10);
q.enqueue(20);
q.enqueue(30);

console.log(q.dequeue()); // 10
console.log(q.peek());    // 20
console.log(q.dequeue()); // 20
console.log(q.dequeue()); // 30
console.log(q.isEmpty()); // true
