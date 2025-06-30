/**
 * 238. 除自身以外数组的乘积
 *
 * 题目描述：
 * 给你一个整数数组 nums，返回一个数组 answer，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积。
 *
 * 题目数据保证数组中任意元素的全部前缀元素和后缀元素的乘积都在 32 位 整数范围内。
 *
 * 请不要使用除法，且在 O(n) 时间复杂度内完成此题。
 *
 * 示例 1:
 * 输入: nums = [1,2,3,4]
 * 输出: [24,12,8,6]
 *
 * 示例 2:
 * 输入: nums = [-1,1,0,-3,3]
 * 输出: [0,0,9,0,0]
 *
 * 进阶：你可以在 O(1) 的额外空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组不被视为额外空间。）
 */

/**
 * 方法一：左右乘积列表（最容易理解的方法）
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 *
 * 思路：
 * 1. 创建两个数组 L 和 R，L[i] 表示索引 i 左侧所有元素的乘积，R[i] 表示索引 i 右侧所有元素的乘积。
 * 2. 对于给定的索引 i，结果就是 L[i] * R[i]。
 *
 * 举例：nums = [1, 2, 3, 4]
 * L = [1, 1, 2, 6]  (从左到右累乘)
 * R = [24, 12, 4, 1] (从右到左累乘)
 *
 * 结果:
 * answer[0] = L[0] * R[0] = 1 * 24 = 24
 * answer[1] = L[1] * R[1] = 1 * 12 = 12
 * answer[2] = L[2] * R[2] = 2 * 4 = 8
 * answer[3] = L[3] * R[3] = 6 * 1 = 6
 */
function productExceptSelf1(nums) {
    const n = nums.length;
    const L = new Array(n).fill(1);
    const R = new Array(n).fill(1);
    const answer = new Array(n);

    // 计算左侧乘积
    for (let i = 1; i < n; i++) {
        L[i] = nums[i - 1] * L[i - 1];
    }

    // 计算右侧乘积
    for (let i = n - 2; i >= 0; i--) {
        console.log({n})
        R[i] = nums[i + 1] * R[i + 1];
    }

    // 计算最终结果
    for (let i = 0; i < n; i++) {
        answer[i] = L[i] * R[i];
    }

    return answer;
}

/**
 * 方法二：空间复杂度 O(1) 的优化解法 ⭐⭐⭐
 * 时间复杂度：O(n)
 * 空间复杂度：O(1) (输出数组不计入额外空间)
 *
 * 思路：
 * 这是一个非常巧妙的优化！
 * 1. 第一次遍历，先将 answer[i] 计算为 i 左侧所有元素的乘积（同方法一的 L 数组）。
 * 2. 第二次遍历，从右到左，维护一个变量 R 表示右侧所有元素的乘积。
 *    在遍历的同时，用 answer[i] 乘以 R，就得到了最终结果。
 *
 * 举例：nums = [1, 2, 3, 4]
 *
 * 第一次遍历 (计算左侧乘积，存入 answer):
 * i=0, answer = [1, _, _, _]
 * i=1, answer = [1, 1, _, _]
 * i=2, answer = [1, 1, 2, _]
 * i=3, answer = [1, 1, 2, 6]
 *
 * 第二次遍历 (从右到左，乘以右侧乘积):
 * R 初始化为 1
 * i=3: answer[3] = answer[3] * R = 6 * 1 = 6;  更新 R = R * nums[3] = 1 * 4 = 4
 * i=2: answer[2] = answer[2] * R = 2 * 4 = 8;  更新 R = R * nums[2] = 4 * 3 = 12
 * i=1: answer[1] = answer[1] * R = 1 * 12 = 12; 更新 R = R * nums[1] = 12 * 2 = 24
 * i=0: answer[0] = answer[0] * R = 1 * 24 = 24; 更新 R = R * nums[0] = 24 * 1 = 24
 *
 * 最终 answer = [24, 12, 8, 6]
 */
function productExceptSelf2(nums) {
    const n = nums.length;
    const answer = new Array(n).fill(1);

    // 步骤1：计算前缀乘积，并存入 answer 数组
    // answer[i] 此时存储的是 nums[i] 左侧所有元素的乘积
    for (let i = 1; i < n; i++) {
        answer[i] = answer[i - 1] * nums[i - 1];
    }

    // 步骤2：计算后缀乘积，并与前缀乘积相乘
    let rightProduct = 1; // 用于存储右侧元素的乘积
    for (let i = n - 1; i >= 0; i--) {
        // 对于索引 i，answer[i] 已经有了左侧的乘积
        // 现在需要乘以右侧的乘积 rightProduct
        answer[i] = answer[i] * rightProduct;
        // 更新 rightProduct，为下一个位置做准备
        rightProduct *= nums[i];
    }

    return answer;
}

// --- 可视化演示 ---
function visualizeProductExceptSelf(nums) {
    console.log('\n' + '='.repeat(60));
    console.log('🎨 238. 除自身以外数组的乘积 - 可视化演示');
    console.log('='.repeat(60));
    console.log(`\n📊 输入数组: [${nums.join(', ')}]`);

    const n = nums.length;
    const answer = new Array(n).fill(1);

    console.log('\n🔵 步骤 1: 计算前缀乘积 (从左到右)');
    console.log('   answer[i] = answer[i-1] * nums[i-1]');
    console.log('─'.repeat(50));
    for (let i = 1; i < n; i++) {
        const prevAnswer = answer[i - 1];
        const prevNum = nums[i - 1];
        answer[i] = prevAnswer * prevNum;
        console.log(`   i=${i}: answer[${i}] = answer[${i-1}] * nums[${i-1}] = ${prevAnswer} * ${prevNum} = ${answer[i]}`);
    }
    console.log(`\n    промежуточный массив (только префиксные произведения): [${answer.join(', ')}]`);

    console.log('\n🔴 步骤 2: 计算后缀乘积并合并 (从右到左)');
    console.log('   answer[i] *= rightProduct; rightProduct *= nums[i]');
    console.log('─'.repeat(50));
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        console.log(`   i=${i}:`);
        const currentAnswer = answer[i];
        console.log(`     - 当前 answer[${i}] (前缀积): ${currentAnswer}`);
        console.log(`     - 当前 rightProduct (后缀积): ${rightProduct}`);
        answer[i] = currentAnswer * rightProduct;
        console.log(`     - 更新 answer[${i}] = ${currentAnswer} * ${rightProduct} = ${answer[i]}`);
        const currentNum = nums[i];
        rightProduct *= currentNum;
        console.log(`     - 更新 rightProduct = rightProduct * nums[${i}] = ${rightProduct / currentNum} * ${currentNum} = ${rightProduct}`);
    }

    console.log(`\n🏆 最终结果: [${answer.join(', ')}]`);
    return answer;
}


// --- 测试用例 ---
console.log("=== 238. 除自身以外数组的乘积 测试 ===");

const testCases = [
    [1, 2, 3, 4],
    [-1, 1, 0, -3, 3]
];

testCases.forEach((nums, index) => {
    console.log(`\n--- 测试用例 ${index + 1}: [${nums.join(', ')}] ---`);
    console.log(`方法一 (左右乘积列表): [${productExceptSelf1([...nums]).join(', ')}]`);
    console.log(`方法二 (O(1)空间优化): [${productExceptSelf2([...nums]).join(', ')}]`);
});


// 运行可视化演示
visualizeProductExceptSelf([1, 2, 3, 4]);


// 导出主要函数（推荐使用O(1)空间优化的方法）
module.exports = productExceptSelf2; 