/*
A Worker Pool manages multiple worker threads to process tasks concurrently 
while limiting the number of workers running at the same time. 
Approach
1. Use a Queue (taskQueue) to manage incoming tasks.
2. Use a Counter (activeWorkers) to track running tasks.
3. When run (taskFunction) is called:
   If available, execute immediately and increment activeWorkers.
   Otherwise, enqueue the task for later execution.
4. When a task finishes:
   Decrement activeWorkers.
   Start the next task from taskQueue if available.

This code defines a WorkerPool class that allows you to control the concurrency
of async task executions — useful when you want to run only a certain number of tasks simultaneously.
*/

class WorkerPool {
    constructor(maxWorkers) {
        // Maximum number of tasks allowed to run concurrently
        this.maxWorkers = maxWorkers;

        // Counter to track how many tasks are currently running
        this.activeWorkers = 0;

        // Queue to hold tasks waiting to be executed
        this.taskQueue = [];
    }

    run(taskFunction) {
        // Returns a promise that resolves or rejects based on task execution
        return new Promise((resolve, reject) => {

            // Function that actually runs the task
            const executeTask = async () => {
                try {
                    // Increment active worker count before starting
                    this.activeWorkers++;

                    // Execute the asynchronous task
                    const result = await taskFunction();

                    // Resolve the promise with the result
                    resolve(result);
                } catch (error) {
                    // If task fails, reject the promise
                    reject(error);
                } finally {
                    // Decrement the active worker count after task completes
                    this.activeWorkers--;

                    // If there are pending tasks, take one from queue and run it
                    if (this.taskQueue.length > 0) {
                        const nextTask = this.taskQueue.shift();
                        nextTask(); // Execute the next queued task
                    }
                }
            };

            // If we have available workers, execute the task immediately
            if (this.activeWorkers < this.maxWorkers) {
                executeTask();
            } else {
                // Otherwise, enqueue the task to run later
                this.taskQueue.push(executeTask);
            }  
        });
    }
}

// Export the WorkerPool class for use in other modules
module.exports = WorkerPool;


// Example usage
const pool = new WorkerPool(2);
async function task (id, delay) {
    return new Promise(resolve => setTimeout(() => resolve(`Task ${id} done after ${delay}`), delay) );
}
pool.run(() => task(1, 1000)).then(res=>console.log(res));
pool.run(() => task(2, 5000)).then(console.log);
pool.run(() => task(3, 6000)).then(console.log);
pool.run(() => task(4, 200)).then(console.log);
pool.run(() => task(5, 300)).then(console.log);