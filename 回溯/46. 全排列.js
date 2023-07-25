var permute = function (nums) {
    const res = [], path = [];

    function backtracking(arr, len, used) {
        if (path.length === len) {
            res.push([...path]);
            return;
        }

        for (let i = 0; i < len; i++) {
            if (used[i]) {
                continue;
            }
            path.push(arr[i]);
            used[i] = true; // 标记已使用
            backtracking(arr, len, used);
            path.pop();
            used[i] = false;
        }
    }
    backtracking(nums, nums.length, []);
    return res;
}