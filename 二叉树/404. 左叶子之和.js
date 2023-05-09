// 递归
var sumOfLeftLeaves = function (root) {
    // 采用后续遍历 递归遍历
    // 1. 确定递归函数参数
    const nodesSum = function (node) {
        // 2. 确定终止条件
        if (node === null) {
            return 0
        }
        let leftValue = nodesSum(node.left);
        let rightValue = nodesSum(node.right);
        // 3. 单层递归逻辑
        let midValue = 0;
        // 当前节点为叶子节点？
        if (node.left && node.left.left === null && node.left.right === null) {
            midValue = node.left.val;
        }
        let sum = midValue + leftValue + rightValue;
        return sum;
    }
    return nodesSum(root)
}

// 迭代
var sumOfLeftLeaves = function (root) {
    // 采用层序遍历
    if (root == null) {
        return null
    }
    let queue = [root];
    let sum = 0;
    while (queue.length) {
        let node = queue.shift();
        if (node.left !== null && node.left.left === null && node.left.right === null) {
            sum += node.left.val;
        }
        node.left && queue.push(node.left);
        node.right && queue.push(node.right);
    }
    return sum
}