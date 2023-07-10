var combinationSum3 = function (k, n) {
    // n：目标和
    // k：题目中要求k个数的集合。
    // sum：已经收集的元素的总和，也就是path里元素的总和。
    // startIndex：下一层for循环搜索的起始位置。
    let res = [];
    let path = [];
    let sum = 0;

    const dfs = (path, index) => {
        // 剪枝操作
        if (sum > n) {
            return;
        }
        if (path.length === k) {
            if (sum === n) {
                res.push([...path]);
                return;
            }
        }

        for (let i = index; i <= 9 - (k - path.length) + 1; i++) {
            path.push(i);
            sum += i;
            // 注意i+1调整startIndex
            index += 1;
            dfs(path, index);
            sum -= i; // 回溯
            path.pop();// 回溯
        }
    }
    dfs(path, 1);
    return res;
}