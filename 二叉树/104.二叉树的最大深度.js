var maxDepth = function (root) {
  if (root === null) {
    return 0;
  }

  let queue = [root];
  let height = 0;
  while (queue.length) {
    let length = queue.length;
    height++;
    for (let i = 0; i < length; i++) {
      let node = queue.shift();
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return height;
};
