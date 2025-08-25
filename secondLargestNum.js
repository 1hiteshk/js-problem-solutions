
const nums = [1,2,4,5,9,-3,6,9,0];

function secondLargestNum(arr){
    let first = -Infinity;
    let second = -Infinity;
    for(let i=0; i<arr.length;i++){
        if(arr[i]>first){
            second = first;
            first = arr[i];
        } else if(arr[i]>second && arr[i]!==first ){
            second=arr[i]
        }
    }
    
    console.log(second);
    console.log(first);
}
secondLargestNum(nums)