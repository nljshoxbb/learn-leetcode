var hasPathSum = function (root, targetSum) {
    // 递归
    const traversal = (node, count) => {
        // 遇到叶子节点，并且计数为0
        if (count === 0 && !node.left && !node.right) {
            return true;
        }
        // 遇到叶子节点而没有找到合适的边（计数不为0），直接返回
        if (!node.left && !node.right) {
            return false;
        }
        // 左（空节点不遍历）,遇到叶子节点返回true,则直接返回true
        if (node.left && traversal(node.left, count - node.left.val)) {
            return true
        }
        //  右（空节点不遍历）
        if (node.right && traversal(node.right, count - node.right.val)) {
            return true
        }

        return false
    }

    if (!root) {
        return false;
    }

    return traversal(root, targetSum - root.val);
}


// 迭代
var hasPathSum = function (root, targetSum) {
    if (root === null) {
        return false;
    }
    let nodeQueue = [root];
    let valQueue = [0];
    while (nodeQueue.length) {
        let curNode = nodeQueue.shift();
        let curVal = valQueue.shift();
        curVal += curNode.val;
        // 为叶子结点，且和等于目标数，返回true
        if (curNode.left === null && curNode.right === null && curVal === targetSum) {
            return true;
        }
        // 左节点，将当前的数值也对应记录下来
        if (curNode.left) {
            nodeQueue.push(curNode.left);
            valQueue.push(curVal);
        }
        if (curNode.right) {
            nodeQueue.push(curNode.right);
            valQueue.push(curVal)
        }
    }
    return false
}