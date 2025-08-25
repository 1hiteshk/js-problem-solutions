/* 
In Node.js, EventEmitter is a class from the events module that allows you to create and handle custom events.
It's used to subscribe to (listen for) and emit (trigger) named events 
— similar to how DOM events work in the browser.

on(eventName, callback): Subscribes a listener to an event.
emit(eventName, [...args]): Emits the event and calls all listeners.
once(eventName, callback): Adds a one-time listener.
removeListener(eventName, callback) or off(): Removes a listener.
*/

// Import the events module
const EventEmitter = require('events');

// Create an instance of EventEmitter
const myEmitter = new EventEmitter();

// Register an event listener for the "greet" event
myEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Emit the "greet" event with an argument
myEmitter.emit('greet', 'Hitesh'); // Output: Hello, Hitesh!

/* Explanation:
require('events'): Loads the built-in Node.js events module.
new EventEmitter(): Creates a new event emitter instance.
on('greet', callback): Listens for the 'greet' event.
emit('greet', 'Hitesh'): Triggers the 'greet' event and passes 'Hitesh' to the callback.  */

myEmitter.once('bye', () => {
  console.log('Goodbye! only once');
});

myEmitter.emit('bye'); // Output: Goodbye!
myEmitter.emit('bye'); // Nothing happens
// The 'bye' event listener is removed after the first call

/* Use Cases:
Logging systems
Server request/response lifecycle
Custom signals between parts of an app
Streams and file I/O  */