var postorderTraversal = function (root, res = []) {
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
    stack.push(node);
    stack.push(null);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return res;
};
