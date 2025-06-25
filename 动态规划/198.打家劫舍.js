// 方法一：基础动态规划
function rob(nums) {
    const n = nums.length;
    
    // 🎯 边界情况处理
    if (n === 0) return 0;
    if (n === 1) return nums[0];
    if (n === 2) return Math.max(nums[0], nums[1]);
    
    // 📊 创建DP数组
    // dp[i] = 偷到第i个房子时能获得的最大金额
    let dp = new Array(n);
    
    // 🎪 初始化
    dp[0] = nums[0];                    // 只有第0个房子
    dp[1] = Math.max(nums[0], nums[1]); // 前两个房子选最大的
    
    // 🔄 状态转移
    for (let i = 2; i < n; i++) {
        // 选择偷或不偷第i个房子
        dp[i] = Math.max(
            dp[i-1],           // 不偷第i个房子
            dp[i-2] + nums[i]  // 偷第i个房子
        );
        
        console.log(`房子${i}: 金额${nums[i]}, 最大收益${dp[i]}`);
    }
    
    return dp[n-1];
}

// 🧪 测试
console.log("示例1:", rob([2,7,9,3,1])); // 输出: 12
console.log("示例2:", rob([2,1,1,2]));   // 输出: 4

// 方法二：空间优化版本
function robOptimized(nums) {
    const n = nums.length;
    if (n === 0) return 0;
    if (n === 1) return nums[0];
    
    // 🎯 只需要记住前两个状态
    let prev2 = nums[0];                    // dp[i-2]
    let prev1 = Math.max(nums[0], nums[1]); // dp[i-1]
    
    for (let i = 2; i < n; i++) {
        let current = Math.max(prev1, prev2 + nums[i]);
        
        console.log(`房子${i}: 不偷=${prev1}, 偷=${prev2 + nums[i]}, 选择=${current}`);
        
        // 🔄 更新状态
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// 方法三：递归+记忆化
function robMemo(nums) {
    const memo = new Map();
    
    function helper(i) {
        // 🎯 基础情况
        if (i < 0) return 0;
        if (i === 0) return nums[0];
        
        // 📖 检查缓存
        if (memo.has(i)) {
            console.log(`🎯 从缓存获取房子${i}的结果: ${memo.get(i)}`);
            return memo.get(i);
        }
        
        // 🧮 计算结果
        console.log(`🔢 计算房子${i}...`);
        const result = Math.max(
            helper(i-1),           // 不偷第i个房子
            helper(i-2) + nums[i]  // 偷第i个房子
        );
        
        memo.set(i, result);
        return result;
    }
    
    return helper(nums.length - 1);
}