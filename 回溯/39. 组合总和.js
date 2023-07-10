var combinationSum = function (candidates, target) {
    const res = [], path = [];
    function backtracking(startIndex, sum) {
        if (sum === target) {
            res.push(Array.from(path));
            return;
        }

        for (let i = startIndex; i < candidates.length; i++) {
            const n = candidates[i];
            if (n > target - sum) {
                break;
            }
            path.push(n);
            sum += n;
            // 关键点:不用i+1了，表示可以重复读取当前的数
            backtracking(i, sum);
            path.pop();
            sum -= n;
        }
    }

    candidates.sort((a, b) => a - b);
    backtracking(0,0);
    return res;


}