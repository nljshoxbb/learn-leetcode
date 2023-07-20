var restoreIpAddresses = function (s) {
    const res = [], path = [];

    function backtracking(startIndex) {
        const len = path.length;
        if (len > 4) {
            return;
        }
        /** 4段 为完整ip结构，组合字符串把结果加入res中 */
        if (length === 4 && startIndex === s.length) {
            res.push(path.join("."));
            return;
        }
        // 单层逻辑
        for (let j = startIndex; j < s.length; j++) {
            const str = s.slice(startIndex, j + 1);
            /** 超过255不合法 */
            if (str.length > 3 || +str > 255) {
                break
            }
            /** 0开头不合法 */
            if (str.length > 1 && str[0] === '0') {
                break;
            }
            path.push(str);
            backtracking(j + 1);
            path.pop();

        }
    }
    backtracking(0);
    return res;
}