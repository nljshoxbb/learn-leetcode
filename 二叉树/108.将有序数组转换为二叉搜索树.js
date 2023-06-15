// 递归
var sortedArrayToBST = function (nums) {
    const buildTree = (arr, left, right) => {
        if (left > right) {
            return null;
        }
        // 取数组中间元素的位置 (left + right) / 2;
        // 处理数组越界 left + (right - left) / 2
        let mid = Math.floor(left + (right - left) / 2);

        let root = new TreeNode(arr[mid]);
        root.left = buildTree(arr, left, mid - 1);
        root.right = buildTree(arr, mid + 1, right)
        return root;
    }
    return buildTree(nums, 0, nums.length - 1);
}

// 迭代
var sortedArrayToBST = function (nums) {
    if (nums.length === 0) {
        return null;
    }
    let root = new TreeNode(0); // 初始根节点
    let nodeQueue = [root]; // 放遍历的节点，并初始化
    let leftQueue = [0];  // 放左区间的下标，初始化
    let rightQueue = [nums.length - 1]; // 放右区间的下标

    while (nodeQueue.length) {
        let curNode = nodeQueue.pop();
        let left = leftQueue.pop();
        let right = rightQueue.pop();
        let mid = left + Math.floor((right - left) / 2);

        curNode.val = nums[mid]; // 将下标为mid的元素给中间节点

        // 处理左区间
        if (left <= mid - 1) {
            curNode.left = new TreeNode(0);
            nodeQueue.push(curNode.left);
            leftQueue.push(left);
            rightQueue.push(mid - 1);
        }
        // 处理右区间
        if (right >= mid + 1) {
            curNode.right = new TreeNode(0);
            nodeQueue.push(curNode.right);
            leftQueue.push(mid + 1);
            rightQueue.push(right);
        }
    }

    return root;
}