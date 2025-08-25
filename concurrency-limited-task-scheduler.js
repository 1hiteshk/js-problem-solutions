/**
 * Execute async tasks with limited concurrency.
 * @param {Function[]} asyncTaskFunctions - Array of functions that return Promises.
 * @param {number} maxConcurrentLimit - Maximum number of concurrent tasks.
 * @return {Promise<Array>} - Resolves to an array of results in the original task order.
 */
async function scheduleTasksWithLimit(asyncTaskFunctions, maxConcurrentLimit) {
  const taskResults = new Array(asyncTaskFunctions.length); // Result array
  let nextTaskIndex = 0; // Next task to start
  let runningTasks = 0; // Currently running task count

  return new Promise((resolve, reject) => {
    // Attempt to run more tasks within the concurrency limit
    function runNextTask() {
      // All tasks finished?
      if (nextTaskIndex === asyncTaskFunctions.length && runningTasks === 0) {
        resolve(taskResults);
        return;
      }

      // Start tasks while we have room for concurrency
      while (runningTasks < maxConcurrentLimit && nextTaskIndex < asyncTaskFunctions.length) {
        const currentIndex = nextTaskIndex++;
        runningTasks++;

        asyncTaskFunctions[currentIndex]()
          .then((result) => {
            taskResults[currentIndex] = result;
          })
          .catch(reject)
          .finally(() => {
            runningTasks--;
            runNextTask();
          });
      }
    }

    runNextTask(); // Kick off the first batch
  });
}

module.exports = scheduleTasksWithLimit;


function createMockTask(id, delay) {
  return () => new Promise((resolve) => {
    console.log(`Starting task ${id} (delay: ${delay}ms)`);
    setTimeout(() => {
      console.log(`Completed task ${id}`);
      resolve(`Result ${id}`);
    }, delay);
  });
}

const mockTasks = [
  createMockTask(1, 1000),
  createMockTask(2, 500),
  createMockTask(3, 300),
  createMockTask(4, 700),
  createMockTask(5, 400),
];

// Run with maxConcurrent = 2
scheduleTasksWithLimit(mockTasks, 2).then((results) => {
  console.log('All tasks completed. Final Results:', results);
});

/*  What You'll See
This will:

Log task start/completion in real-time.

Limit at most 2 tasks running concurrently.

Output final result array in task order: */

/* 📊 Execution Timeline (max 2 tasks at once)
| Time | Active Tasks | Events                     |
| ---- | ------------ | -------------------------- |
| 0ms  | 1, 2         | Start Task 1 & 2           |
| 500  | 1, 3         | Task 2 done → Start Task 3 |
| 800  | 1, 4         | Task 3 done → Start Task 4 |
| 1000 | 4, 5         | Task 1 done → Start Task 5 |
| 1200 | 4, -         | Task 5 done                |
| 1500 | -            | Task 4 done → All Done     |
 */
/* 
✅ Total time: 1500ms = 1.5 seconds
Because tasks are started as slots become free, and 
total work is distributed efficiently with 2 concurrent tasks. */

/* 🔁 It's an Async Loop via Recursion
Unlike Promise.all() (which launches all promises at once), we launch only maxConcurrentLimit 
at any time, and each .finally() triggers the next one, like a chain reaction. */

/* ⏱ Parallelism without Promise.all
At runtime, JavaScript’s event loop:
Allows multiple setTimeout-based tasks (or any async tasks) to run concurrently.
Async functions do not block — they pause and yield control.
So, each time we call tasks[i](), it's scheduled immediately, and its .then() and .finally() 
logic allows overlapping execution. */

/* 
🧠 Comparison Table
| Feature              | `Promise.all()`           | Controlled Concurrency      |
| -------------------- | ------------------------- | --------------------------- |
| Launch style         | All at once               | Batched (e.g., 2 at a time) |
| Max concurrency      | Unlimited                 | Limited (`maxConcurrent`)   |
| Resource usage       | High                      | Controlled                  |
| Total execution time | Fastest                   | Slightly slower             |
| Stability            | Risk of overload          | Safer for APIs, DB, etc.    |
| Use case             | Safe for local/light work | Best for I/O-heavy systems  | */

/* 🎢 Imagine: A Ride Queue at an Amusement Park
You have 5 kids (tasks).
But only 2 can ride at once (maxConcurrentLimit = 2).
As soon as 1 kid finishes the ride, the next in line hops on.
All kids eventually get a turn.
This is what the code does! */

/* Step-by-step:
while loop says: “Hey, do we still have room for more kids (tasks)?”
asyncTaskFunctions[currentIndex]() is like putting a kid on the ride.
It starts the task, but doesn’t wait — it keeps looping to start more tasks if there's room.
The .finally(() => { ... }) part waits until the ride finishes. When that happens:
One kid gets off the ride (runningTasks--).
Another kid from the line jumps on (runNextTask()). */

/* 🧠 Key Idea (the Magic)
Even though finally runs after a task finishes, the .then, .catch, and .finally 
are attached immediately when asyncTaskFunctions[currentIndex]() is called.

That means:
All tasks that fit in the limit start immediately.
They run at the same time, because JavaScript lets Promises be non-blocking. */

/* ⚡ Real-World Parallel
Imagine microwave ovens:
You have 3 ovens (tasks).
You put 2 pizzas (maxConcurrentLimit = 2).
Both pizzas are cooking at the same time.
You didn’t wait for one to finish before starting the other.
As soon as one pizza is done, you put another in.

That's parallel task execution. */

/* 
function createMockTask(id, delay, shouldFail = false) {
  return () => new Promise((resolve, reject) => {
    console.log(`Starting task ${id} (delay: ${delay}ms)`);
    setTimeout(() => {
      if (shouldFail) {
        console.log(`Task ${id} failed!`);
        reject(new Error(`Task ${id} failed`));
      } else {
        console.log(`Completed task ${id}`);
        resolve(`Result ${id}`);
      }
    }, delay);
  });
}

const mockTasks = [
  createMockTask(1, 1000),
  createMockTask(2, 500),
  createMockTask(3, 300, true), // 💥 This one fails
  createMockTask(4, 700),
  createMockTask(5, 400),
];

scheduleTasksWithLimit(mockTasks, 2)
  .then((results) => {
    console.log('All tasks completed. Final Results:', results);
  })
  .catch((error) => {
    console.error('Task execution failed:', error.message);
  });

*/
