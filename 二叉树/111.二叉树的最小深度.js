var minDepth = function (root) {
    if (!root) {
        return 0
    }
    // 到叶子节点 返回 1
    if (!root.left && !root.right) return 1;
    // 只有右节点时， 递归右节点
    if (!root.left) {
        return 1 + minDepth(root.right)
    }
    // 只有左节点时 递归左节点
    if (!root.right) {
        return 1 + minDepth(root.left)
    }
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1
}

// 迭代
var minDepth = function (root) {
    if (!root) {
        return 0
    }

    const queue = [root];
    let dep = 0;
    while (queue.length > 0) {
        let size = queue.length;
        dep++;
        while (size--) {
            const node = queue.shift();
            // 到第一个叶子节点 返回当前深度
            if (!node.left && !node.right) return dep;
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
    }
}