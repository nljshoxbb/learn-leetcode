/**
 * 739. 每日温度
 * 
 * 给定一个整数数组 temperatures，表示每天的温度，返回一个数组 answer，
 * 其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。
 * 如果气温在这之后都不会升高，请在该位置用 0 来代替。
 * 
 * 示例 1:
 * 输入: temperatures = [73,74,75,71,69,72,76,73]
 * 输出: [1,1,4,2,1,1,0,0]
 * 
 * 示例 2:
 * 输入: temperatures = [30,40,50,60]
 * 输出: [1,1,1,0]
 * 
 * 示例 3:
 * 输入: temperatures = [30,60,90]
 * 输出: [1,1,0]
 */

/**
 * 方法一：单调栈（推荐）
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * 
 * 思路：
 * 1. 使用单调递减栈存储温度的索引
 * 2. 遍历温度数组，对于每个温度：
 *    - 如果当前温度大于栈顶索引对应的温度，说明找到了栈顶元素的下一个更高温度
 *    - 弹出栈顶元素，计算天数差，直到栈为空或当前温度不大于栈顶温度
 *    - 将当前索引入栈
 * 3. 栈中维护的是还没有找到下一个更高温度的索引
 */
var dailyTemperatures = function(temperatures) {
    const n = temperatures.length;
    const result = new Array(n).fill(0);
    const stack = []; // 单调递减栈，存储索引
    
    for (let i = 0; i < n; i++) {
        // 当前温度大于栈顶索引对应的温度时，找到了栈顶的下一个更高温度
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevIndex = stack.pop();
            result[prevIndex] = i - prevIndex; // 计算天数差
        }
        stack.push(i); // 将当前索引入栈
    }
    
    return result;
};

/**
 * 方法二：暴力解法（不推荐，仅供理解）
 * 时间复杂度：O(n²)
 * 空间复杂度：O(1)
 */
var dailyTemperaturesBruteForce = function(temperatures) {
    const n = temperatures.length;
    const result = new Array(n).fill(0);
    
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (temperatures[j] > temperatures[i]) {
                result[i] = j - i;
                break;
            }
        }
    }
    
    return result;
};

// 测试用例
console.log("=== 739. 每日温度 测试 ===");

// 测试用例1
const test1 = [73, 74, 75, 71, 69, 72, 76, 73];
console.log("输入:", test1);
console.log("输出:", dailyTemperatures(test1));
console.log("期望: [1,1,4,2,1,1,0,0]");
console.log();

// 测试用例2
const test2 = [30, 40, 50, 60];
console.log("输入:", test2);
console.log("输出:", dailyTemperatures(test2));
console.log("期望: [1,1,1,0]");
console.log();

// 测试用例3
const test3 = [30, 60, 90];
console.log("输入:", test3);
console.log("输出:", dailyTemperatures(test3));
console.log("期望: [1,1,0]");
console.log();

// 边界测试
const test4 = [89, 62, 70, 58, 47, 47, 46, 76, 100, 70];
console.log("输入:", test4);
console.log("输出:", dailyTemperatures(test4));
console.log();

/**
 * 算法详解：
 * 
 * 单调栈的核心思想：
 * 1. 栈中存储的是还没有找到"下一个更大元素"的元素索引
 * 2. 栈从底到顶按照对应的温度值单调递减
 * 3. 当遇到一个更大的温度时，它就是栈中某些元素的"下一个更大元素"
 * 
 * 执行过程示例（temperatures = [73,74,75,71,69,72,76,73]）：
 * 
 * i=0, temp=73: stack=[], 入栈 -> stack=[0]
 * i=1, temp=74: 74>73, 弹出0, result[0]=1-0=1 -> stack=[1]
 * i=2, temp=75: 75>74, 弹出1, result[1]=2-1=1 -> stack=[2]
 * i=3, temp=71: 71<75, 入栈 -> stack=[2,3]
 * i=4, temp=69: 69<71, 入栈 -> stack=[2,3,4]
 * i=5, temp=72: 72>69, 弹出4, result[4]=5-4=1
 *               72>71, 弹出3, result[3]=5-3=2
 *               72<75, 入栈 -> stack=[2,5]
 * i=6, temp=76: 76>72, 弹出5, result[5]=6-5=1
 *               76>75, 弹出2, result[2]=6-2=4
 *               入栈 -> stack=[6]
 * i=7, temp=73: 73<76, 入栈 -> stack=[6,7]
 * 
 * 最终结果：[1,1,4,2,1,1,0,0]
 */ 



