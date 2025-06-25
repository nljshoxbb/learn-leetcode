function explainDecision(nums) {
    const n = nums.length;
    let dp = new Array(n);
    
    // 初始化
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    
    console.log("🏠 房子金额:", nums);
    console.log("📊 决策过程:");
    
    for (let i = 2; i < n; i++) {
        const option1 = dp[i-1];           // 不偷
        const option2 = dp[i-2] + nums[i]; // 偷
        
        console.log(`\n🤔 第${i}个房子 (金额: ${nums[i]}):`);
        console.log(`   选择1 - 不偷: ${option1}`);
        console.log(`   选择2 - 偷: ${dp[i-2]} + ${nums[i]} = ${option2}`);
        
        dp[i] = Math.max(option1, option2);
        console.log(`   💡 决策: ${dp[i]} (${dp[i] === option1 ? '不偷' : '偷'})`);
        
        // 显示当前最优路径
        console.log(`   📈 到第${i}个房子的最大收益: ${dp[i]}`);
    }
    
    return dp[n-1];
}

// 🧪 测试
explainDecision([2, 7, 9, 3, 1]);

function explainSpaceOptimization(nums) {
    const n = nums.length;
    console.log("🏠 房子金额:", nums);
    console.log("📊 变量含义对应关系:");
    console.log();
    
    // 初始化
    let prev2 = nums[0];                    // dp[0]
    let prev1 = Math.max(nums[0], nums[1]); // dp[1]
    
    console.log("初始状态:");
    console.log(`prev2 = ${prev2} (对应 dp[0])`);
    console.log(`prev1 = ${prev1} (对应 dp[1])`);
    console.log();
    
    for (let i = 2; i < n; i++) {
        let current = Math.max(prev1, prev2 + nums[i]);
        
        console.log(`第${i}轮循环:`);
        console.log(`  current = max(${prev1}, ${prev2} + ${nums[i]}) = ${current}`);
        console.log(`  相当于: dp[${i}] = max(dp[${i-1}], dp[${i-2}] + nums[${i}])`);
        
        // 更新变量
        console.log(`  更新前: prev2=${prev2}, prev1=${prev1}`);
        prev2 = prev1;
        prev1 = current;
        console.log(`  更新后: prev2=${prev2}, prev1=${prev1}`);
        console.log(`  现在 prev1 对应 dp[${i}]`);
        console.log();
    }
    
    console.log(`🎯 最终: prev1 = ${prev1} (对应 dp[${n-1}])`);
    console.log(`这就是考虑所有${n}个房子的最大收益！`);
    
    return prev1;
}

// 🧪 测试
explainSpaceOptimization([2, 7, 9, 3, 1]);