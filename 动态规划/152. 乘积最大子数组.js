/**
 * 152. 乘积最大子数组
 *
 * 题目描述：
 * 给你一个整数数组 nums，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字），
 * 并返回该子数组所对应的乘积。
 *
 * 示例 1:
 * 输入: nums = [2,3,-2,4]
 * 输出: 6
 * 解释: 子数组 [2,3] 有最大乘积 6。
 *
 * 示例 2:
 * 输入: nums = [-2,0,-1]
 * 输出: 0
 * 解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
 *
 * 示例 3:
 * 输入: nums = [-2,3,-4]
 * 输出: 24
 * 解释: 子数组 [-2,3,-4] 有最大乘积 24。
 */

/**
 * 方法一：动态规划 - 标准解法 ⭐⭐⭐
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 *
 * 核心思想：
 * 由于存在负数，负数乘以负数会变成正数，所以我们需要同时维护：
 * 1. 以当前元素结尾的最大乘积 (maxProduct)
 * 2. 以当前元素结尾的最小乘积 (minProduct)
 * 
 * 状态转移：
 * - 如果当前数字为正数：maxProduct = max(num, maxProduct * num)
 * - 如果当前数字为负数：maxProduct = max(num, minProduct * num)
 * - 同时更新 minProduct
 */
function maxProduct1(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let maxProduct = nums[0];  // 以当前元素结尾的最大乘积
    let minProduct = nums[0];  // 以当前元素结尾的最小乘积
    let result = nums[0];      // 全局最大乘积
    
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        
        // 如果当前数字是负数，交换max和min
        // 因为负数乘以最大值会变成最小值，乘以最小值会变成最大值
        if (num < 0) {
            [maxProduct, minProduct] = [minProduct, maxProduct];
        }
        
        // 更新最大和最小乘积
        maxProduct = Math.max(num, maxProduct * num);
        minProduct = Math.min(num, minProduct * num);
        
        // 更新全局最大值
        result = Math.max(result, maxProduct);
    }
    
    return result;
}

/**
 * 方法二：动态规划 - 不交换版本（更容易理解）
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function maxProduct2(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let maxProduct = nums[0];
    let minProduct = nums[0];
    let result = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        
        // 保存当前的最大值，因为下面会修改maxProduct
        const tempMax = maxProduct;
        
        // 计算新的最大和最小乘积
        maxProduct = Math.max(num, Math.max(maxProduct * num, minProduct * num));
        minProduct = Math.min(num, Math.min(tempMax * num, minProduct * num));
        
        // 更新全局最大值
        result = Math.max(result, maxProduct);
    }
    
    return result;
}

/**
 * 方法三：双向遍历法 ⭐⭐⭐
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 *
 * 核心思想：
 * 1. 从左到右遍历一次，计算累积乘积
 * 2. 从右到左遍历一次，计算累积乘积
 * 3. 取两次遍历中的最大值
 * 
 * 这种方法的巧妙之处在于：
 * - 如果数组中有偶数个负数，那么整个数组的乘积就是最大值
 * - 如果数组中有奇数个负数，那么要么去掉最左边的负数，要么去掉最右边的负数
 */
function maxProduct3(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let result = nums[0];
    let leftProduct = 1;
    let rightProduct = 1;
    
    for (let i = 0; i < nums.length; i++) {
        // 从左到右
        leftProduct *= nums[i];
        result = Math.max(result, leftProduct);
        
        // 从右到左
        rightProduct *= nums[nums.length - 1 - i];
        result = Math.max(result, rightProduct);
        
        // 如果乘积为0，重置为1
        if (leftProduct === 0) leftProduct = 1;
        if (rightProduct === 0) rightProduct = 1;
    }
    
    return result;
}

/**
 * 方法四：分治法（处理0的特殊情况）
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function maxProduct4(nums) {
    if (!nums || nums.length === 0) return 0;
    
    let result = nums[0];
    let start = 0;
    
    // 以0为分界点，分别处理每个子数组
    for (let i = 0; i <= nums.length; i++) {
        if (i === nums.length || nums[i] === 0) {
            if (i > start) {
                // 处理从start到i-1的子数组
                result = Math.max(result, maxProductHelper(nums.slice(start, i)));
            }
            if (i < nums.length) {
                result = Math.max(result, 0); // 考虑0本身
            }
            start = i + 1;
        }
    }
    
    return result;
}

function maxProductHelper(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    let maxProduct = nums[0];
    let minProduct = nums[0];
    let result = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        const tempMax = maxProduct;
        maxProduct = Math.max(num, Math.max(maxProduct * num, minProduct * num));
        minProduct = Math.min(num, Math.min(tempMax * num, minProduct * num));
        result = Math.max(result, maxProduct);
    }
    
    return result;
}

// --- 可视化演示 ---
function visualizeMaxProduct(nums) {
    console.log('\n' + '='.repeat(80));
    console.log('🎯 152. 乘积最大子数组 - 可视化演示');
    console.log('='.repeat(80));
    console.log(`\n📊 输入数组: [${nums.join(', ')}]`);

    console.log('\n🔵 方法一：动态规划（维护最大最小值）');
    console.log('─'.repeat(60));
    
    let maxProduct = nums[0];
    let minProduct = nums[0];
    let result = nums[0];
    
    console.log(`初始状态:`);
    console.log(`  maxProduct = ${maxProduct}, minProduct = ${minProduct}, result = ${result}`);
    
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        console.log(`\n步骤 ${i}: 处理 nums[${i}] = ${num}`);
        
        // 显示交换逻辑
        if (num < 0) {
            console.log(`  ⚠️  当前数字是负数，交换 maxProduct 和 minProduct`);
            [maxProduct, minProduct] = [minProduct, maxProduct];
            console.log(`  交换后: maxProduct = ${maxProduct}, minProduct = ${minProduct}`);
        }
        
        const oldMax = maxProduct;
        const oldMin = minProduct;
        
        maxProduct = Math.max(num, maxProduct * num);
        minProduct = Math.min(num, minProduct * num);
        result = Math.max(result, maxProduct);
        
        console.log(`  计算新值:`);
        console.log(`    maxProduct = max(${num}, ${oldMax} × ${num}) = max(${num}, ${oldMax * num}) = ${maxProduct}`);
        console.log(`    minProduct = min(${num}, ${oldMin} × ${num}) = min(${num}, ${oldMin * num}) = ${minProduct}`);
        console.log(`    result = max(${result - (result === maxProduct ? 0 : maxProduct)}, ${maxProduct}) = ${result}`);
    }
    
    console.log(`\n🏆 最终结果: ${result}`);
    
    // 双向遍历法演示
    console.log('\n🔴 方法三：双向遍历法');
    console.log('─'.repeat(60));
    
    let leftProduct = 1;
    let rightProduct = 1;
    let maxResult = nums[0];
    
    console.log('从左到右遍历:');
    for (let i = 0; i < nums.length; i++) {
        leftProduct *= nums[i];
        maxResult = Math.max(maxResult, leftProduct);
        console.log(`  i=${i}: leftProduct = ${leftProduct}, maxResult = ${maxResult}`);
        if (leftProduct === 0) {
            leftProduct = 1;
            console.log(`    重置 leftProduct = 1`);
        }
    }
    
    leftProduct = 1;
    console.log('\n从右到左遍历:');
    for (let i = nums.length - 1; i >= 0; i--) {
        leftProduct *= nums[i];
        maxResult = Math.max(maxResult, leftProduct);
        console.log(`  i=${i}: leftProduct = ${leftProduct}, maxResult = ${maxResult}`);
        if (leftProduct === 0) {
            leftProduct = 1;
            console.log(`    重置 leftProduct = 1`);
        }
    }
    
    console.log(`\n🏆 双向遍历最终结果: ${maxResult}`);
    
    return result;
}

// --- 详细示例分析 ---
function analyzeExamples() {
    console.log('\n' + '='.repeat(80));
    console.log('📚 详细示例分析');
    console.log('='.repeat(80));
    
    const examples = [
        {
            nums: [2, 3, -2, 4],
            expected: 6,
            explanation: "子数组 [2,3] 有最大乘积 6"
        },
        {
            nums: [-2, 0, -1],
            expected: 0,
            explanation: "结果不能为 2，因为 [-2,-1] 不是连续子数组，0本身是最大值"
        },
        {
            nums: [-2, 3, -4],
            expected: 24,
            explanation: "整个数组 [-2,3,-4] 有最大乘积 24"
        },
        {
            nums: [0, 2],
            expected: 2,
            explanation: "子数组 [2] 有最大乘积 2"
        },
        {
            nums: [-1, -2, -3],
            expected: 6,
            explanation: "子数组 [-2,-3] 有最大乘积 6"
        }
    ];
    
    examples.forEach((example, index) => {
        console.log(`\n--- 示例 ${index + 1}: [${example.nums.join(', ')}] ---`);
        console.log(`期望结果: ${example.expected}`);
        console.log(`解释: ${example.explanation}`);
        
        const result1 = maxProduct1([...example.nums]);
        const result2 = maxProduct2([...example.nums]);
        const result3 = maxProduct3([...example.nums]);
        
        console.log(`方法一结果: ${result1} ${result1 === example.expected ? '✅' : '❌'}`);
        console.log(`方法二结果: ${result2} ${result2 === example.expected ? '✅' : '❌'}`);
        console.log(`方法三结果: ${result3} ${result3 === example.expected ? '✅' : '❌'}`);
    });
}

// --- 性能测试 ---
function performanceTest() {
    console.log('\n' + '='.repeat(80));
    console.log('⚡ 性能测试');
    console.log('='.repeat(80));
    
    // 生成测试数据
    const sizes = [1000, 5000, 10000];
    
    sizes.forEach(size => {
        const nums = Array.from({length: size}, () => Math.floor(Math.random() * 21) - 10);
        
        console.log(`\n📊 数组大小: ${size}`);
        
        const methods = [
            { name: '方法一：动态规划(交换)', fn: maxProduct1 },
            { name: '方法二：动态规划(不交换)', fn: maxProduct2 },
            { name: '方法三：双向遍历', fn: maxProduct3 }
        ];
        
        methods.forEach(method => {
            const start = performance.now();
            const result = method.fn([...nums]);
            const end = performance.now();
            console.log(`  ${method.name}: ${(end - start).toFixed(2)}ms, 结果: ${result}`);
        });
    });
}

// --- 边界情况测试 ---
function edgeCaseTest() {
    console.log('\n' + '='.repeat(80));
    console.log('🧪 边界情况测试');
    console.log('='.repeat(80));
    
    const edgeCases = [
        { nums: [1], name: '单个正数' },
        { nums: [-1], name: '单个负数' },
        { nums: [0], name: '单个零' },
        { nums: [0, 0, 0], name: '全零数组' },
        { nums: [1, 0, 1], name: '包含零的数组' },
        { nums: [-1, -1, -1], name: '奇数个负数' },
        { nums: [-1, -1, -1, -1], name: '偶数个负数' },
        { nums: [2, -1, 2, -1], name: '正负交替' }
    ];
    
    edgeCases.forEach(testCase => {
        console.log(`\n${testCase.name}: [${testCase.nums.join(', ')}]`);
        const result = maxProduct1([...testCase.nums]);
        console.log(`  结果: ${result}`);
    });
}

// 运行演示
console.log('🚀 开始运行 152. 乘积最大子数组 演示程序');

// 可视化演示
visualizeMaxProduct([2, 3, -2, 4]);
visualizeMaxProduct([-2, 3, -4]);

// 详细示例分析
analyzeExamples();

// 边界情况测试
edgeCaseTest();

// 性能测试（可选，取消注释以运行）
// performanceTest();

// 导出主要函数
module.exports = {
    maxProduct1,
    maxProduct2, 
    maxProduct3,
    maxProduct4,
    visualizeMaxProduct,
    analyzeExamples
}; 