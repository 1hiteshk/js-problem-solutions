/* 
Design and implement an EventEmitter class that mimics Node.js-style event handling.
It should support the following methods:
· on (eventName, callback): Register a callback to be called every time the event is triggered.
· once(eventName, callback): Register a one-time callback (removed after first execution).
· off(eventName, callback): Remove a specific callback for an event.
· emit(eventName, ... args): Trigger all callbacks registered for that event with the given arguments.

1. store event listeners in a map where keys are event names and
 values are arrays of listener objects{callback,once}.
2. Add listener (on)
· if event does not exist, initialize with an empty array.
· push the listener with flag once: false (automatically for every entry).
3. Add one-time listener (once)
· similar to on, but set the flag once: true.
4. Remove listener (off)
· filter out the matching callback for the event.
5. Emit event (emit)
· call all listeners callbacks with provided args.
· if once: true, remove the listener after calling.

· on () and once () register events, once includes a flag to auto-remove after call.
· off () removes a specific callback for an event.
· emit () executes all callbacks for the event with arguments and handles once-listeners to be removed filtered.
*/

class EventEmitter {
    constructor() {
        this.events = new Map()
    }
    on(eventName, callback) {
        if (!this.events.has(eventName)) this.events.set(eventName, []);
        this.events.get(eventName).push({ callback, once: false });
    }

    once(eventName, callback) {
        if (!this.events.has(eventName)) this.events.set(eventName, []);
        this.events.get(eventName).push({ callback, once: true });
    }

    off(eventName, callback) {
        if (!this.events.has(eventName)) return;
        const filtered = this.events.get(eventName).filter(l => l.callback !== callback);
        this.events.set(eventName, filtered);
    }

    emit(eventName, ...args) {
        if (!this.events.has(eventName)) return;

        const listeners = this.events.get(eventName);
        const remaining = [];

        for (const listener of listeners) {
            listener.callback(...args);
            if (!listener.once) remaining.push(listener);
        }

        this.events.set(eventName, remaining);
    }
}

const emitter = new EventEmitter();

const log = (...args) => console.log(...args);
emitter.on('sayHello', log);
emitter.emit('sayHello', 'Hello'); // Output: Hello

emitter.once('sayHelloOnce', ()=> console.log('Hello bye!'));
emitter.emit('sayHelloOnce'); // Output: Hello bye!
emitter.emit('sayHelloOnce'); // No output, listener removed after first call

emitter.off('sayHello', log);
emitter.emit('sayHello', 'Hello again'); // No output, listener removed
module.exports = EventEmitter