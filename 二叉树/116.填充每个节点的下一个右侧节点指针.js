var connect = function (root) {
  if (root === null) return root;
  let queue = [root];
  while (queue.length) {
    let n = queue.length;
    for (let i = 0; i < n; i++) {
      let node = queue.shift();
      if (i < n - 1) {
        node.next = queue[0];
      }
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return root;
};
