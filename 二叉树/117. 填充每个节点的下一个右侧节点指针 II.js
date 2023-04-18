/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
  if (root === null) {
    return null;
  }
  let queue = [root];
  while (queue.length > 0) {
    let n = queue.length;
    for (let i = 0; i < n; i++) {
      let node = queue.shift();
      if (i < n - 1) node.next = queue[0];
      if (node.left != null) queue.push(node.left);
      if (node.right != null) queue.push(node.right);
    }
  }
  return root;
};
