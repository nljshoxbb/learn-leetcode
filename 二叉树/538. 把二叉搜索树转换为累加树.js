const convertBST = function (root) {
    let pre = 0;
    const ReverseInOrder = (cur) => {
        if (cur) {
            ReverseInOrder(cur.right); // 右
            cur.val += pre; // 中
            pre = cur.val;
            ReverseInOrder(cur.left); // 左
        }
    }
    ReverseInOrder(root);
    return root;

}