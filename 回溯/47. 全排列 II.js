var permuteUnique = function (nums) {
    nums.sort((a, b) => a - b)
    const result = [];
    const path = [];

    function backtracking(used) {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            /** use[i-1] === false 在树层中去重 */
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
                continue;
            }
            if (!used[i]) {
                used[i] = true;
                path.push(nums[i]);
                backtracking(used);
                path.pop();
                used[i] = false;
            }
        }
    }
    backtracking([]);
    return result;

}