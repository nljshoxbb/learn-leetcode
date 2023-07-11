const isPalindrome = (str, left, right) => {
    for (let i = left, j = right; i < j; i++, j--) {
        if (str[i] !== str[j]) {
            return false
        }
    }
    return true;
}

function partition(str) {
    const res = [], path = [], len = str.length;
    function backtracking(startIndex) {
        // 如果起始位置已经大于str的大小，说明已经找到了一组分割方案了
        if (startIndex >= len) {
            res.push(Array.from(path));
            return;
        }
        for (let i = startIndex; i < len; i++) {
            if (!isPalindrome(str, startIndex, i)) {
                continue;
            }

            path.push(str.slice(startIndex, i + 1));  // 获取[startIndex,i]在s中的子串
            backtracking(i + 1);  // 寻找i+1为起始位置的子串
            path.pop(); // 回溯过程，弹出本次已经填在的子串
        }
    }
    backtracking(0);
    return res;
}