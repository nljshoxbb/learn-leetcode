var jump = function (nums) {
    if (nums.length === 1) {
        return 0;
    }
    let curDistance = 0;  // 当前覆盖最远距离下标
    let ans = 0;          // 记录走的最大步数
    let nextDistance = 0; // 下一步覆盖最远距离下标
    for (let i = 0; i < nums.length; i++) { // 注意是 i < nums.length, 这是关键所在
        nextDistance = Math.max(nums[i] + i, nextDistance); // 更新下一步覆盖的最远距离下标 nums[i]+i 中，i为起始位置，需要加上
        if (i === curDistance) { // 遇到当前覆盖最远距离下标
            ans++; // 需要走下一步
            curDistance = nextDistance;
            if (nextDistance >= nums.length - 1) {
                break;
            }
        }
    }
    return ans;

}