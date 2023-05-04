function invertTree(root) {
  const stack = [];
  let curNode, tempNode;
  if (root !== null) {
    stack.push(root);
  }

  while (stack.length > 0) {
    curNode = stack.pop();
    // 入栈操作最好在交换节点之前进行，便于理解
    if (curNode.right) {
      stack.push(curNode.right);
    }
    if (curNode.left) {
      stack.push(curNode.left);
    }
    tempNode = curNode.left;
  }
}
