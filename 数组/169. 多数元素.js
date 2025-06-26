/**
 * 169. 多数元素
 * 
 * 题目描述：
 * 给定一个大小为 n 的数组 nums ，返回其中的多数元素。
 * 多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 * 
 * 示例 1:
 * 输入：nums = [3,2,3]
 * 输出：3
 * 
 * 示例 2:
 * 输入：nums = [2,2,1,1,1,2,2]
 * 输出：2
 * 
 * 进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。
 */

/**
 * 方法一：哈希表统计（最直观的方法）
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * 
 * 思路：
 * 1. 遍历数组，用哈希表记录每个元素的出现次数
 * 2. 找到出现次数大于 n/2 的元素
 */
function majorityElement1(nums) {
    const map = new Map();
    const majority = Math.floor(nums.length / 2);
    
    for (let num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
        // 一旦发现某个元素出现次数超过一半，立即返回
        if (map.get(num) > majority) {
            return num;
        }
    }
}

/**
 * 方法二：排序法
 * 时间复杂度：O(n log n)
 * 空间复杂度：O(1) 或 O(n)，取决于排序算法的实现
 * 
 * 思路：
 * 由于多数元素出现次数大于 n/2，排序后位于中间位置的元素一定是多数元素
 */
function majorityElement2(nums) {
    nums.sort((a, b) => a - b);
    return nums[Math.floor(nums.length / 2)];
}

/**
 * 方法三：摩尔投票法（Boyer-Moore Voting Algorithm）⭐⭐⭐
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 * 
 * 这是最优解！
 * 
 * 核心思想：
 * 1. 候选人（candidate）和票数（count）
 * 2. 遍历数组：
 *    - 如果票数为0，当前元素成为新候选人
 *    - 如果当前元素等于候选人，票数+1
 *    - 如果当前元素不等于候选人，票数-1
 * 3. 最后剩下的候选人就是多数元素
 * 
 * 为什么这样可行？
 * - 多数元素出现次数 > n/2，其他所有元素出现次数之和 < n/2
 * - 在"抵消"过程中，多数元素最终会胜出
 */
function majorityElement3(nums) {
    let candidate = nums[0]; // 候选人
    let count = 1;           // 票数
    
    // 从第二个元素开始遍历
    for (let i = 1; i < nums.length; i++) {
        if (count === 0) {
            // 票数为0，选择新的候选人
            candidate = nums[i];
            count = 1;
        } else if (nums[i] === candidate) {
            // 支持当前候选人
            count++;
        } else {
            // 反对当前候选人
            count--;
        }
    }
    
    return candidate;
}

/**
 * 方法四：分治法
 * 时间复杂度：O(n log n)
 * 空间复杂度：O(log n)
 * 
 * 思路：
 * 1. 将数组分成两半
 * 2. 分别找出左半部分和右半部分的多数元素
 * 3. 如果两个多数元素相同，则它就是答案
 * 4. 否则，统计两个候选元素在整个数组中的出现次数，返回出现次数多的那个
 */
function majorityElement4(nums) {
    function countInRange(nums, num, left, right) {
        let count = 0;
        for (let i = left; i <= right; i++) {
            if (nums[i] === num) {
                count++;
            }
        }
        return count;
    }
    
    function majorityElementRec(nums, left, right) {
        // 基本情况
        if (left === right) {
            return nums[left];
        }
        
        // 分治
        const mid = Math.floor((left + right) / 2);
        const leftMajority = majorityElementRec(nums, left, mid);
        const rightMajority = majorityElementRec(nums, mid + 1, right);
        
        // 如果两个子数组的多数元素相同，则它就是答案
        if (leftMajority === rightMajority) {
            return leftMajority;
        }
        
        // 否则，统计两个候选元素的出现次数
        const leftCount = countInRange(nums, leftMajority, left, right);
        const rightCount = countInRange(nums, rightMajority, left, right);
        
        return leftCount > rightCount ? leftMajority : rightMajority;
    }
    
    return majorityElementRec(nums, 0, nums.length - 1);
}

/**
 * 方法五：随机化
 * 时间复杂度：期望 O(n)
 * 空间复杂度：O(1)
 * 
 * 思路：
 * 随机选择一个元素，验证它是否为多数元素
 * 由于多数元素出现概率 > 1/2，期望尝试次数很少
 */
function majorityElement5(nums) {
    function countOccurrences(nums, candidate) {
        let count = 0;
        for (let num of nums) {
            if (num === candidate) {
                count++;
            }
        }
        return count;
    }
    
    const majority = Math.floor(nums.length / 2);
    
    while (true) {
        const candidate = nums[Math.floor(Math.random() * nums.length)];
        if (countOccurrences(nums, candidate) > majority) {
            return candidate;
        }
    }
}

// 测试用例
console.log("=== 169. 多数元素 测试 ===");

const testCases = [
    [3, 2, 3],
    [2, 2, 1, 1, 1, 2, 2],
    [1],
    [1, 1, 2, 2, 2],
    [6, 5, 5]
];

testCases.forEach((nums, index) => {
    console.log(`\n测试用例 ${index + 1}: [${nums.join(', ')}]`);
    console.log(`哈希表法: ${majorityElement1([...nums])}`);
    console.log(`排序法: ${majorityElement2([...nums])}`);
    console.log(`摩尔投票法: ${majorityElement3([...nums])}`);
    console.log(`分治法: ${majorityElement4([...nums])}`);
    console.log(`随机化法: ${majorityElement5([...nums])}`);
});

// 详细演示摩尔投票法的过程
function demonstrateBoyerMoore(nums) {
    console.log(`\n🎯 摩尔投票法详细演示: [${nums.join(', ')}]`);
    console.log("步骤说明：");
    
    let candidate = nums[0];
    let count = 1;
    
    console.log(`初始: candidate = ${candidate}, count = ${count}`);
    
    for (let i = 1; i < nums.length; i++) {
        console.log(`\n第${i+1}步: 处理元素 ${nums[i]}`);
        
        if (count === 0) {
            candidate = nums[i];
            count = 1;
            console.log(`  票数为0，选择新候选人: ${candidate}`);
        } else if (nums[i] === candidate) {
            count++;
            console.log(`  支持候选人 ${candidate}，票数+1 = ${count}`);
        } else {
            count--;
            console.log(`  反对候选人 ${candidate}，票数-1 = ${count}`);
        }
        
        console.log(`  当前状态: candidate = ${candidate}, count = ${count}`);
    }
    
    console.log(`\n🏆 最终结果: ${candidate}`);
    return candidate;
}

// 演示摩尔投票法
demonstrateBoyerMoore([2, 2, 1, 1, 1, 2, 2]);

/**
 * 💡 解法总结：
 * 
 * 1. 哈希表法：最直观，适合面试时先想到的方法
 * 2. 排序法：简单易懂，但时间复杂度较高
 * 3. 摩尔投票法：最优解，时间O(n)空间O(1)，是面试官最希望看到的答案
 * 4. 分治法：体现分治思想，但复杂度不如摩尔投票法
 * 5. 随机化法：有趣的思路，但不够稳定
 * 
 * 🌟 推荐掌握：摩尔投票法，这是这道题的精髓所在！
 */

// 导出主要函数（推荐使用摩尔投票法）
module.exports = majorityElement3; 