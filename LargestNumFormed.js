function formLargestNumber(arr) {
  // Convert each number to a string so we can concatenate and compare them
  const nums = arr.map(num => num.toString());

  // Sort the array of strings in a custom order
  nums.sort((a, b) => {
    // Compare concatenated results of (b+a) and (a+b)
    // If b+a is greater, b should come before a
    // Example: For a = '3', b = '30' => '330' vs '303' => '330' is larger, so '3' comes first
    return (b + a).localeCompare(a + b);
  });

  // Edge case: if the largest number is "0", return "0" (e.g., [0, 0, 0])
  if (nums[0] === "0") return '0';

  console.log({arr}); 
  console.log({nums});
  console.log(nums.join("")) // Output: "9534330"
  // Join all the sorted strings to form the final largest number
  return nums.join("");
}
const input = [3, 30, 34, 5, 9];
 formLargestNumber(input);
module.exports = formLargestNumber;



// Given an array of non-negative integers, arrange them such that they form the largest possible number when concatenated.
