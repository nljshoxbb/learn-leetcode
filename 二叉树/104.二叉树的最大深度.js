// 层级遍历
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

// 递归

var maxDepth = function (root) {
  //使用递归的方法 递归三部曲
  //1. 确定递归函数的参数和返回值
  const getdepth = function (node) {
    //2. 确定终止条件
    if (node === null) {
      return 0
    }
    //3. 确定单层逻辑
    let leftdepth = getdepth(node.left);
    let rightdepth = getdepth(node.right);
    let depth = 1 + Math.max(leftdepth, rightdepth);
    return depth;
  }

  return getdepth(root)
}