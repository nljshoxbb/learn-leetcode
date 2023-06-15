// 递归
var trimBST = function (root, low, high) {
    if (root === null) {
        return null;
    }

    if (root.val < low) {
        let right = trimBST(root.right, low, high);
        return right;
    }

    if (root.val > high) {
        let left = trimBST(root.left, low, high);
        return left;
    }

    root.left = trimBST(root.left, low, high);
    root.right = trimBST(root.right, low, high);
    return root;
}

// 迭代
var trimBST = function (root, low, high) {
    if (root === null) {
        return null;
    }
    while (root !== null && (root.val < low || root.val > high)) {
        // 没满足 则往前走
        if (root.val < low) {
            root = root.right;
        } else {
            root = root.left;
        }
    }
    /** 走到满足的区间，开始调整二叉树 */
    let cur = root;
    while (cur != null) {
        while (cur.left && cur.left.val < low) {
            // root左节点不满足，则root左节点的右侧节点替换为root的左节点
            // 此时root的左节点相当于删除了
            cur.left = cur.left.right;
        }
        cur = cur.left;
    }
    cur = root;
    while (cur !== null) {
        while (cur.right && cur.right.val > high) {
            cur.right = cur.right.left;
        }
        cur = cur.right;
    }
    return root;
}