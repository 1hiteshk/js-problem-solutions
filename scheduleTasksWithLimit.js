/**
 * Execute async tasks with limited concurrency, optionally continuing on failures.
 *
 * @param {Function[]} asyncTaskFunctions - Array of functions that return Promises.
 * @param {number} maxConcurrentLimit - Maximum number of concurrent tasks.
 * @param {boolean} [continueOnError=false] - If true, continue even if some tasks fail.
 * @return {Promise<Array>} - Resolves to an array of results (or errors) in the original task order.
 */
async function scheduleTasksWithLimit(asyncTaskFunctions, maxConcurrentLimit, continueOnError = false) {
  const taskResults = new Array(asyncTaskFunctions.length);
  let nextTaskIndex = 0;
  let runningTasks = 0;

  return new Promise((resolve, reject) => {
    function runNextTask() {
      if (nextTaskIndex === asyncTaskFunctions.length && runningTasks === 0) {
        resolve(taskResults);
        return;
      }

      while (runningTasks < maxConcurrentLimit && nextTaskIndex < asyncTaskFunctions.length) {
        const currentIndex = nextTaskIndex++;
        runningTasks++;

        asyncTaskFunctions[currentIndex]()
          .then((result) => {
            taskResults[currentIndex] = result;
          })
          .catch((error) => {
            if (continueOnError) {
              taskResults[currentIndex] = `FAILED: ${error.message}`;
            } else {
              reject(error);
            }
          })
          .finally(() => {
            runningTasks--;
            runNextTask();
          });
      }
    }

    runNextTask();
  });
}

module.exports = scheduleTasksWithLimit;

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
  })
  .finally((results)=>{
    console.log('All tasks completed. Final Results:', results);
  });
