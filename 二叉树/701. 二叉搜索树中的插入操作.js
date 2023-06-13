// 有返回值的递归写法
var insertIntoBST = function (root, val) {
    const setInOrder = (root, val) => {
        if (root === null) {
            let node = new TreeNode(val);
            return node;
        }
        if (root.val > val) {
            root.left = setInOrder(root.left, val);
        }
        if (root.val < val) {
            root.right = setInOrder(root.right, val);
        }
        return root;
    }

    return setInOrder(root, val);
}


// 迭代
var insertIntoBST = function (root, val) {
    if (root === null) {
        root = new TreeNode(val);
    } else {
        let parent = new TreeNode(0);
        let cur = root;
        while (cur) {
            parent = cur;
            if (cur.val > val) {
                cur = cur.left;
            } else {
                cur = cur.right;
            }
        }
        let node = new TreeNode(val);
        if (parent.val > val) {
            parent.left = node;
        } else {
            parent.right = node;
        }
    }
    return root;
}