var findSubsquences = function (nums) {
    const result = [], path = [];
    function backtracking(startIndex) {
        /** 递增子序列长度至少是2 */
        if (path.length > 1) {
            result.push([...path]);
        }

        /** 数值范围 [-100,100] */
        let uset = [];
        for (let i = startIndex; i < nums.length; i++) {
            /** uset[nums[i] + 100] true 说明已用过，不能再使用 */
            if ((path.length > 0 && nums[i] < path[path.length - 1]) || uset[nums[i] + 100]) {
                continue
            }
            /** 记录这个元素在本层用过了，本层后面不能再用了 */
            uset[nums[i] + 100] = true;
            path.push(nums[i]);
            backtracking(i + 1);
            path.pop();
        }
    }
    backtracking(0);
    return result;
}