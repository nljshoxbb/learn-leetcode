// 入栈 左 -> 右
// 出栈 左->中->右
const inorderTraversal = (root) => {
  const res = [];
  const stack = [];
  let cur = root;
  while (stack.length || cur) {
    if (cur) {
      stack.push(cur);
      // 左
      cur = cur.left;
    } else {
      // --> 弹出 中
      cur = stack.pop();
      res.push(cur.val);
      // 右
      cur = cur.right;
    }
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

// 5 4 1
// 5 4 ; 1
// 5 2; 1 4
// 5 ; 1 4 2
// 5 6 ; 1 4 2
// 5 ; 1 4 2 6
//;1 4 2 6 5
