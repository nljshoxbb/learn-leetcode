// 递归
var maxDepth = function (root) {
    if (!root) {
        return 0
    }
    let depth = 0;
    for (let node of root.children) {
        depth = Math.max(depth, maxDepth(node))
    }
    return depth + 1
}

// N叉树的最大深度 层序遍历
var maxDepth = function (root) {
    if (!root) {
        return 0
    }
    let count = 0;
    let queue = [root];
    while (queue.length) {
        let size = queue.length;
        count++;
        while (size--) {
            let node = queue.shift();
            for (let item of node.children) {
                <item></item> && queue.push(item)
            }
        }
    }
    return count;
}