var largestSumAfterKNegations = function (nums, k) {
    nums.sort((a, b) => Math.abs(b) - Math.abs(a))

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < 0 && k > 0) {
            nums[i] = -nums[i];
            k--;
        }
    }

    // 若k还大于0,则寻找最小的数进行不断取反
    while (k > 0) {
        nums[nums.length - 1] = -nums[nums.length - 1];
        k--;
    }
    // 使用箭头函数的隐式返回值时，需使用简写省略花括号，否则要在 a + b 前加上 return
    return nums.reduce((a, b) => a + b, 0)

}

// 版本二，一次遍历
var largestSumAfterKNegations = function (nums, k) {
    nums.sort((a, b) => Math.abs(b) - Math.abs(a))
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < 0 && k > 0) {
            nums[i] = -nums[i];
            k--;
        }
        sum += nums[i]
    }

    if (k % 2 > 0) { // k 有多余的（k若消耗完则应为 -1）
        sum -= 2 * nums[nums.length - 1]; //  减去两倍的最小值（因为之前加过一次）
    }
    return sum;

}