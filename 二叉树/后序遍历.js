// 入栈  左 -> 右

// 出栈 中 -> 右 -> 左 结果翻转
var postorderTraversal = function (root, res = []) {
  if (!root) return res;
  const stack = [root];
  let cur = null;
  do {
    cur = stack.pop();
    res.push(cur.val);
    cur.left && stack.push(cur.left);
    cur.right && stack.push(cur.right);
  } while (stack.length);
  return res.reverse();
};

/**
 *      5
 *     / \
 *    4   6
 *   / \
 *  1   2
 *
 */

// 4 6 ； 5
// 4 ； 5 6
// 1 2 ; 5 6 4
// 1; 5 6 4 2
// ; 5 6 4 2 1
// reverse 1 2 4 6 5
