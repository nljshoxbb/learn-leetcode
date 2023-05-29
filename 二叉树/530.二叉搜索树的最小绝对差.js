var getMinimumDifference = function (root) {
    let arr = [];
    const buildArr = (root) => {
        if (root) {
            buildArr(root.left);
            arr.push(root.val);
            buildArr(root.right);
        }
    }

    buildArr(root);
    let diff = arr[arr.length - 1];
    for (let i = 1; i < arr.length; i++) {
        if (diff > arr[i] - arr[i - 1]) {
            diff = arr[i] - arr[i - 1];
        }
    }
    return diff;
}

var getMinimumDifference = function (root) {
    let res = Infinity;
    let preNode = null;
    // 中序遍历
    const inorder = (node) => {
        if (!node) {
            return;
        }
        inorder(node.left);
        // 更新res
        if (preNode) {
            res = Math.min(res, node.val - preNode.val);
        }
        // 记录前一个节点
        preNode = node;
        inorder(node.right);
    }
    inorder(root);
    return res;
}