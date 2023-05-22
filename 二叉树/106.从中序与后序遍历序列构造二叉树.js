var buildTree = function (inorder, postorder) {
    if (!inorder.length) return null;
    // 从后序遍历的数组中获取中间节点的值， 即数组最后一个值
    const rootVal = postorder.pop();
    // 获取中间节点在中序遍历中的下标
    let rootIndex = inorder.indexOf(rootVal);
    // 创建中间节点
    const root = new TreeNode(rootVal);

    // 创建左节点
    root.left = buildTree(inorder.slice(0, rootIndex), postorder.slice(0, rootIndex));
    // 创建右节点
    root.right = buildTree(inorder.slice(rootIndex + 1), postorder.slice(rootIndex));

    return root;
}

