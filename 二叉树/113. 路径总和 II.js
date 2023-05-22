var pathSum = function (root, targetSum) {
    // 递归
    // 要遍历整个树找到所有路径，所以递归函数不需要返回值, 与112不同
    const res = [];
    const travelsal = (node, count, path) => {
        // 遇到了叶子节点且找到了和为sum的路径
        if (count === 0 && !node.left && !node.right) {
            // 不能写res.push(path), 要深拷贝
            res.push([...path]);
            return;
        }
        if (!node.left && !node.right) {
            // 遇到叶子节点而没有找到合适的边，直接返回
            return;
        }

        // 左 （空节点不遍历）
        if (node.left) {
            path.push(node.left.val);
            travelsal(node.left, count - node.left.val, path)
            path.pop(); // 回溯
        }
        // 右 (空节点不遍历)
        if (node.right) {
            path.push(node.right.val);
            travelsal(node.right, count - node.right.val, path);
            path.pop();
        }
        return;
    }

    if (!root) {
        return res;
    }
    travelsal(root, targetSum - root.val, [root.val])
    return res
}

// 迭代
var pathSum = function (root, targetSum) {
    if (root === null) {
        return []
    }
    let nodeArr = [root];
    let resArr = []; // 记录符合目标和的返回路径 
    let temArr = [[]]; // 对应路径
    let countArr = [0]; // 对应和
    while (nodeArr.length) {
        let curNode = nodeArr.shift();
        let curVal = countArr.shift();
        let curNodeArr = temArr.shift();

        curVal += curNode.val;
        curNodeArr.push(curNode.val);
        // 为叶子结点，且和等于目标数，将此次结果数组push进返回数组中
        if (curNode.left === null && curNode.right === null && curVal === targetSum) {
            resArr.push(curNodeArr)
        }
        // 左节点，将当前的和及对应路径也对应记录下来
        if (curNode.left) {
            nodeArr.push(curNode.left);
            countArr.push(curVal);
            temArr.push([...curNodeArr])
        }
        if (curNode.right) {
            nodeArr.push(curNode.right);
            countArr.push(curVal);
            temArr.push([...curNodeArr]);
        }
    }
    return resArr;
}