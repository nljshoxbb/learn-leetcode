var combine = function (n, k) {
    let result = [];
    let path = [];

    var combineHelper = (n, k, startIndex) => {
        /** 叶子节点，返回 */
        if (path.length === k) {
            result.push([...path]);
            return;
        }
        for (let i = startIndex; i <= n; i++) {
            path.push(i); // 处理节点
            combineHelper(n, k, i + 1); // 递归处理
            path.pop();//回溯，撤销处理的节点
        }
    }

    combineHelper(n, k, 1);
    return result;
}

// 剪枝优化
var combine = function (n, k) {
    let result = [];
    let path = [];

    var combineHelper = (n, k, startIndex) => {
        /** 叶子节点，返回 */
        if (path.length === k) {
            result.push([...path]);
            return;
        }
        /**
         * 
         *  
            已经选择的元素个数：path.length;
            还需要的元素个数为: k - path.length;
            在集合n中至多要从该起始位置 : n - (k - path.length) + 1，开始遍历

            为什么有个+1呢，因为包括起始位置，我们要是一个左闭的集合。
            举个例子，n = 4，k = 3， 目前已经选取的元素为0（path.length为0），n - (k - 0) + 1 即 4 - ( 3 - 0) + 1 = 2。
            从2开始搜索都是合理的，可以是组合[2, 3, 4]。
         */
        for (let i = startIndex; i <= n -(k-path.length)+1; i++) {
            path.push(i); // 处理节点
            combineHelper(n, k, i + 1); // 递归处理
            path.pop();//回溯，撤销处理的节点
        }
    }

    combineHelper(n, k, 1);
    return result;
}
