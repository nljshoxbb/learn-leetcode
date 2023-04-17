var preorderTraversal = function (root, res = []) {
  const stack = [];
  if (root) {
    stack.push(root);
  }
  while (stack.length) {
    const node = stack.pop();

    if (!node) {
      res.push(stack.pop().val);
      continue;
    }

    if (node.right) stack.push(node.right); // 右
    if (node.left) stack.push(node.left); //左
    stack.push(node); // 中
    stack.push(null);
  }
  return res;
};
