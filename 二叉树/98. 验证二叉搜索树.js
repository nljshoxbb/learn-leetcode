// 辅助数组解决
var isValidBST = function (root) {
    let arr = [];
    const buildArr = (root) => {
        if (root) {
            buildArr(root.left);
            arr.push(root.val);
            buildArr(root.right);
        }
    }
    buildArr(root);

    for (let i = 1; i < arr.length; ++i) {
        if (arr[i] <= arr[i - 1]) {
            return false
        }
    }
    return true;
}

// 递归中解决

var isValidBST = function (root) {
    let pre = null;
    const inOrder = (root) => {
        if (root === null) {
            return true;
        }
        let left = inOrder(root.left);
        if (pre !== null && pre.val >= root.val) {
            return false;
        }
        pre = root;

        let right = inOrder(root.right);
        return left && right
    }
    return inOrder(root);
}