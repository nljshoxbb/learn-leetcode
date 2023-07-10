var combinationSum2 = function(candidates, target) {
    const res = []; path = [], len = candidates.length;
    candidates.sort((a,b)=>a-b);
    backtracking(0, 0);
    return res;
    function backtracking(sum, startIndex) {
        if (sum === target) {
            res.push(Array.from(path));
            return;
        }
        for(let i = startIndex; i < len; i++) {
            const n = candidates[i];
            if(i > startIndex && candidates[i] === candidates[i-1]){
              //若当前元素和前一个元素相等
              //则本次循环结束，防止出现重复组合
              continue;
            }
            //如果当前元素值大于目标值-总和的值
            //由于数组已排序，那么该元素之后的元素必定不满足条件
            //直接终止当前层的递归
            if(n > target - sum) break;
            path.push(n);
            sum += n;
            backtracking(sum, i + 1);
            path.pop();
            sum -= n;
        }
    }
};