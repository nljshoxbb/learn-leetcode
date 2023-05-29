// 递归法
var mergeTrees = function (root1, root2) {
    const preOrder = (root1, root2) => {
        if (!root1) {
            return root2;
        }
        if (!root2) {
            return root1;
        }
        root1.val += root2.val;
        root1.left = preOrder(root1.left, root2.left);
        root1.right = preOrder(root1.right, root2.right);
        return root1;
    }
    return preOrder(root1, root2)
}

// 迭代

var mergeTrees = function (root1, root2) {
    if (root1 === null) return root2;
    if (root2 === null) return root1;

    let queue = [root1, root2];

    while (queue.length) {
        let node1 = queue.shift();
        let node2 = queue.shift();
        node1.val += node2.val;
        if (node1.left && node2.left) {
            queue.push(node1.left);
            queue.push(node2.left);
        }
        if (node1.right && node2.right) {
            queue.push(node1.right);
            queue.push(node2.right);
        }
        if (!node1.left && node2.left) {
            node1.left = node2.left;
        }
        if (!node1.right && node2.right) {
            node1.right = node2.right;
        }
    }
    return root1;
}