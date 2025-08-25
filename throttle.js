function throttle(func,delay){
    let lastCall = 0;

    return function(...args) {
        const now = Date.now(); // Get the current time in milliseconds = new Date().getTime();
        // If the time since the last call is greater than or equal to the delay
        if (now - lastCall >= delay) {
            lastCall = now;
            return func(...args);
        }
    }
}

const sendMsg = throttle((msg) => {
  // Function to send a message
  console.log("Message sent:", msg);
}, 2000);

sendMsg("Hello!"); // Will log "Message sent: Hello!" immediately
sendMsg("Hello again!"); // Will not log, as it's within the 2 seconds
sendMsg("Hello after 2 seconds!"); // Will log after 2 seconds
setTimeout(()=>sendMsg("Hello after 1 seconds!"), 1000); // Will not log 
setTimeout(()=>sendMsg("Hello after 2 seconds! ye last"), 2000); // Will log after 2 seconds

