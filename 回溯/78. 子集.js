var subsets = function (nums) {
    const result = [], path = [];

    function backtracking(startIndex) {
        result.push([...path]);
        for (let i = startIndex; i < nums.length; i++) {
            path.push(nums[i]);
            backtracking(i + 1);
            path.pop();
        }
    }
    backtracking(0);
    return result;
}