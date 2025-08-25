// Simulate an API call with artificial delay and random failure
function simulateApiCall(data) {
  const responseTime = Math.random() * 2000; // Random response time up to 2 seconds
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% chance of success
      if (isSuccess) {
        // Simulate successful API response
        resolve({ status: 200, data, message: "Success" });
      } else {
        // Simulate API failure
        reject({ status: 500, message: "Internal Server Error" });
      }
    }, responseTime); // Simulate network delay
  });
}

// Retry wrapper for simulateApiCall
function apiCallWithRetry(data, retryDelay = 1000, retries = 5) {
  return new Promise((resolve, reject) => {
    // Recursive function to attempt the API call
    function attempt(retryCount) {
      simulateApiCall(data, retryDelay)
        .then(resolve) // On success, resolve the outer promise
        .catch((err) => {
          if (retryCount > 0) {
            // If retries left, retry the call
            console.warn(`Retrying... (${retryCount -1} retries left)`);
            attempt(retryCount - 1); // Decrement retry count and try again
          } else {
            // All retries failed, reject with final error
            reject({ ...err, message: "Failed after retries" });
          }
        });
    }

    attempt(retries); // Initial call with full retry count
  });
}

apiCallWithRetry({ id: 123, name: "Alice" }, 1000, 3)
  .then((response) => console.log("API Success:", response))
  .catch((error) => console.error("API Final Failure:", error));
