async function test() {
    console.log(1);  // (1) sync

    setTimeout(() => console.log(2), 0);  // (7) macrotask

    await new Promise((resolve) => {
        console.log(3);  // (2) sync
        resolve();       // resume after promise is resolved
    });

    // (next lines go into microtask queue after resolve)

    console.log(4);  // (5) microtask: first after await

    new Promise((resolve) => resolve(9)).then(console.log); // (6) microtask

    process.nextTick(() => console.log('10'));  // (4) NEXT-TICK: runs before microtasks
    // ← Not native in browsers , acts like a microtask but will be enqueued at last after all promises

    await new Promise((resolve) => resolve(5))
        .then(() => {})                         // (noop)
        .then((res) => console.log(res))        // (7) logs undefined
        .catch((err) => console.log(6, err))    // skipped
        .then(() => console.log(7));            // (8) microtask

    console.log(8);  // (9) microtask
}

test();             // (called immediately)
console.log(0);     // (3) sync
// Output order: 1,3,0, 10, 4, 9,undefined, 7, 8, 2
// Explanation: 
// 1. Synchronous logs (1,3, 0) are executed first.
// 2. `process.nextTick` runs before any microtasks, logging 10.
// 3. The first microtask logs 4 after the await.
// 4. The promise resolves to 9, logging it next.
// 5. The next microtask logs 8.
// 6. Finally, the macrotask logs 2.

//❌ process.nextTick does not exist in browsers, so it's simulated or polyfilled (and behaves like a microtask, not a true nextTick)

/* ✅ In Browser/Programiz:
process.nextTick is not native

Likely polyfilled as a Promise.then(...), which is a microtask, not a nextTick

It gets queued after the current microtasks, not before

✅ In Node.js:
process.nextTick() runs before any other microtasks

That's why '10' appears right after 0 in Node */

/* 👉 A microtask is not guaranteed to run immediately after another microtask — only
 that it runs after the current call stack and in the order it was enqueued. */