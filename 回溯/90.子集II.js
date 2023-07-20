var subsetsWithDup = function (nums) {
    const result = [];
    const path = [];
    const sortNums = nums.sort((a, b) => a - b)

    function backtracking(startIndex, sortNums) {
        result.push([...path]);
        if (startIndex > nums.length - 1) {
            return;
        }
        for (let i = startIndex; i < nums.length; i++) {
            /** 跳过当前树层使用过的、相同的元素 */
            if (i > startIndex && nums[i] === nums[i - 1]) {
                continue;
            }
            path.push(nums[i]);
            backtracking(i + 1, sortNums);
            path.pop();
        }
    }
    backtracking(0,sortNums);
    return result;

}