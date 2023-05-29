// 额外空间map

var findMore = function (root) {
    // 使用递归中序遍历
    let map = new Map();
    // 1. 确定递归函数以及函数参数
    const traverTree = function (node) {
        // 2. 确定递归终止条件
        if (node === null) {
            return;
        }
        traverTree(node.left);
        // 3. 单层递归逻辑
        map.set(node.val, map.has(node.val) ? map.get(node.val) + 1 : 1);
        traverTree(node.right);
    }

    traverTree(root);

    // 上面把数据都存储到map
    // 下面开始寻找map里面的
    // 定义一个最大出现次数的初始值为root.val的出现次数
    let maxCount = map.get(root.val);
    //定义一个存放结果的数组res
    let res = [];
    // 二叉搜索树，因为中序遍历，数组值递增
    for (let [key, value] of map) {
        // 如果当前的值等于最大出现次数就直接在res增加该值
        if (value === maxCount) {
            res.push(key);
        }
        // 如果value的值大于原本的maxCount就清空res的所有值，因为找到了更大的
        if (value > maxCount) {
            res = [];
            maxCount = value;
            res.push(key);
        }
    }
    return res;
}

// 不使用额外空间，利用二叉树性质，中序遍历(有序)：
var findMore = function (root) {
    //  不使用额外空间，使用中序遍历,设置出现最大次数初始值为1
    let count = 0, maxCount = 1;
    let pre = root, res = [];
    // 1. 确定递归函数及函数参数
    const traverTree = function (cur) {
        // 2. 确定递归终止条件
        if (cur === null) {
            return;
        }
        traverTree(cur.left);
        // 3. 单层递归逻辑
        if (pre.val === cur.val) {
            count++;
        } else {
            count = 1;
        }
        pre = cur;
        if (count === maxCount) {
            res.push(cur.val)
        }
        if (count > maxCount) {
            res = [];
            maxCount = count;
            res.push(cur.val);
        }
        traverTree(cur.right);
    }
    traverTree(root);
    return res;
}

//迭代
// var findMore = function (root) {
//     const helperStack = [];
//     const res = [];
//     let count, maxCount = 0;
//     let preNode = null;
//     let curNode = root;

//     while (curNode || helperStack.length > 0) {
//         if (curNode) {
//             helperStack.push(curNode);
//             curNode = curNode.left;
//         }else{
//             curNode =helperStack.pop()
//         }
//     }

// }