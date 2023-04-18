var minDepth = function (root) {
  if (root === null) {
    return 0;
  }

  let queue = [root];
  let depth = 0;
  while (queue.length) {
    let length = queue.length;
    depth++;
    for (let i = 0; i < length; i++) {
      let node = queue.shift();
      // 如果左右节点都是null(在遇见的第一个leaf节点上)，则该节点深度最小
      if (node.left === null && node.right === null) {
        return depth;
      }
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return depth;
};
