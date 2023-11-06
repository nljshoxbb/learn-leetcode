// 暴力解法
var canCompleteCircuit = function (gas, cost) {
    for (let i = 0; i < cost.length; i++) {
        let rest = gas[i] - cost[i]; // 记录剩余油量
        let index = (i + 1) % cost.length;  // 以i为起点行驶一圈，index为下一个目的地
        while (rest > 0 && index !== i) {
            rest += gas[index] - cost[index];
            index = (index + 1) % cost.length;
        }

        // 如果以i为起点跑一圈，剩余油量>=0，返回该起始位置
        if (rest >= 0 && index === i) {
            return i;
        }
    }
    return -1;
}

// 贪心二
// gas = [1,2,3,4,5]
// cost = [3,4,5,1,2]
// 3

// gas = [2,3,4]
// cost = [3,4,3]
//  -1

var canCompleteCircuit = function (gas, cost) {
    const gasLen = gas.length;
    let start = 0;
    let curSum = 0;
    let totalSum = 0;

    for (let i = 0; i < gasLen; i++) {
        curSum += gas[i] - cost[i];
        totalSum += gas[i] - cost[i];
        // 局部最优
        if (curSum < 0) {
            curSum = 0;
            start = i + 1;
        }
    }

    // 说明怎么走都不可能跑一圈了
    if (totalSum < 0) {
        return -1;
    }

    return start;

}