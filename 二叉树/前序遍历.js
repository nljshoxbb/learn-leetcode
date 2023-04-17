// 入栈 右 -> 左
// 中->左->右
const preorderTraversal = function (root, res = []) {
  if (!root) {
    return res;
  }

  const stack = [root];
  let cur = null;

  while (stack.length) {
    cur = stack.pop();
    res.push(cur.val);
    cur.right && stack.push(cur.right);
    cur.left && stack.push(cur.left);
  }
  return res;
};

/**
 *      5
 *     / \
 *    4   6
 *   / \
 *  1   2
 */

// 5 4 1 2 6
