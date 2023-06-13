var deleteNode = function (root, key) {
    if (!root) {
        return null;
    }
    if (key > root.val) {
        root.right = deleteNode(root.right, key);
        return root;
    } else if (key < root.val) {
        root.left = deleteNode(root.left, key);
        return root;
    } else {
        // 场景1：该节点是叶子节点
        if (!root.left && !root.right) {
            return null;
        }
        // 场景2：有一个孩子节点不存在
        if (root.left && !root.right) {
            return root.left;
        } else if (!root.left && root.right) {
            return root.right;
        }
        // 场景3：左右节点都存在
        const rightNode = root.right;
        // 获取最小值节点
        const minNode = getMinNode(rightNode);
        // 删除最小节点
        root.right = deleteNode(root.right, minNode.val);
        return root;
    }
}

function getMinNode(root) {
    while (root.left) {
        root = root.left;
    }
    return root;
}