var buildTree = function (preorder, inorder) {
    if (!preorder.length) return null;
    // 从前序遍历的数组中获取中间节点的值， 即数组第一个值
    const rootVal = preorder.shift();
    const rootIndex = inorder.indexOf(rootVal);
    const rootNode = new TreeNode(rootVal);

    rootNode.left = buildTree(preorder.slice(0, rootIndex), inorder.slice(0, rootIndex));
    rootNode.right = buildTree(preorder.slice(rootIndex), inorder.slice(rootIndex + 1))

    return rootNode;
}