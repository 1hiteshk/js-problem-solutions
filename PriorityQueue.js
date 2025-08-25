class PriorityQueue {
    constructor() {
        this.items = [];
    }
    enqueue(value, priority) {
        // Add element
        const newItem = { value, priority };
        let inserted = false;
        // insert based on priority
        for (let i = 0; i < this.items.length; i++){
            if (priority < this.items[i].priority) {
                this.items.splice(i, 0, newItem);
                inserted = true;
                break;
            }
        }

        if (!inserted) {
            this.items.push(newItem); // lowest priority push to end
        }
    }

    dequeue() {
        // Remove and return element with highest priority
        return this.isEmpty() ? null : this.items.shift().value;
    }

    peek() {
        // Return highest priority element
        return this.isEmpty() ? null : this.items[0].value;
    }

    isEmpty() {
        // Return boolean
        return this.items.length === 0;
    }

    size() {
        // Return number of items
        return this.items.length
    }
}

const pq = new PriorityQueue();
pq.enqueue(10,1)
pq.enqueue(20,2)
pq.enqueue(100,1)
pq.enqueue(400,3)
pq.enqueue(1,0)

console.log(pq.dequeue())
console.log(pq.dequeue())
console.log(pq.dequeue())
console.log(pq.dequeue())
console.log(pq.dequeue())