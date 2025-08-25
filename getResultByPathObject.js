function getResultByPath(path, obj) {
  // Normalize the path: convert any array-style brackets to dot notation
  // Example: 'data.results[0].status' => 'data.results.0.status'
  const normalizedPath = path.replace(/\[(\d+)\]/g, '.$1');

  // Split the path into keys by dot, e.g. ['data', 'results', '0', 'status']
  const keys = normalizedPath.split(".");

  // Start traversing from the root object
  let result = obj;

  for (let key of keys) {
    // If result becomes undefined or null, break early (prevent error)
    if (result === undefined || result === null) break;

    // Move one level deeper into the object
    result = result[key];
  }

  // Return the final resolved value or undefined if not found
  return result;
}

const path = "data.results.status";
const obj = {
  data: {
    results:
    {
      status: "completed",
      error: "",
    }
  },
}
console.log(getResultByPath(path, obj));
module.exports = getResultByPath;

/* 🔍 Regex Breakdown: /\[(\d+)\]/g
| Part     | Meaning                                        |
| -------- | ---------------------------------------------- |
| `\[`     | Matches literal `[` (escaped)                  |
| `(\d+)`  | Captures one or more digits (i.e. array index) |
| `\]`     | Matches literal `]` (escaped)                  |
| `g` flag | Global – applies to all matches in the string  |
| `'.$1'`  | Replaces `[index]` with `.index`               |
 */

// "results[0].name" → "results.0.name"
