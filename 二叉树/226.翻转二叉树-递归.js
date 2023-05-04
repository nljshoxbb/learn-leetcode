// 递归版本前序遍历
var invertTree = function (root) {
  // 终止条件
  if (!root) {
    return root;
  }

  // 交换左右节点
  const tempNode = root.left;
  root.left = root.right;
  root.right = tempNode;
  invertTree(root.left);
  invertTree(root.right);
  return root;
};

// 递归版本后序遍历
var invertTree = function (root) {
  // 终止条件
  if (!root) {
    return root;
  }

  invertTree(root.left);
  invertTree(root.right);

  // 交换左右节点
  const tempNode = root.left;
  root.left = root.right;
  root.right = tempNode;

  return root;
};

// 递归版本中序遍历
var invertTree = function (root) {
  if (!root) {
    return root;
  }

  invertTree(root.left);
  let tempNode = root.left;
  root.left = root.right;
  root.right = tempNode;
  // 因为左右节点已经进行交换，此时的root.left 是原先的root.right
  invertTree(root.left);
  return root;
};
