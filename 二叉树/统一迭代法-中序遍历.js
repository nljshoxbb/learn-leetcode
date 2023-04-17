var inorderTraversal = function (root, res = []) {
  const stack = [];
  if (root) {
    stack.push(root);
  }
  while (stack.length) {
    // 将该节点弹出，避免重复操作，下面再将右中左节点添加到栈中
    const node = stack.pop();

    // 只有遇到空节点的时候，才将下一个节点放进结果集
    if (!node) {
      res.push(stack.pop().val);
      continue;
    }
    // 添加右节点（空节点不入栈）
    if (node.right) stack.push(node.right);
    stack.push(node); // 添加中节点
    stack.push(null); // 中节点访问过，但是还没有处理，加入空节点做为标记。
    if (node.left) stack.push(node.left); // 添加左节点（空节点不入栈）
  }
  return res;
};
