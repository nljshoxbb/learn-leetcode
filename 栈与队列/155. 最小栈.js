/**
 * 155. 最小栈
 * 
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
 * 
 * 实现 MinStack 类:
 * - MinStack() 初始化堆栈对象。
 * - void push(int val) 将元素val推入堆栈。
 * - void pop() 删除堆栈顶部的元素。
 * - int top() 获取堆栈顶部的元素。
 * - int getMin() 获取堆栈中的最小元素。
 * 
 * 示例 1:
 * 输入：
 * ["MinStack","push","push","push","getMin","pop","top","getMin"]
 * [[],[-2],[0],[-3],[],[],[],[]]
 * 
 * 输出：
 * [null,null,null,null,-3,null,0,-2]
 * 
 * 解释：
 * MinStack minStack = new MinStack();
 * minStack.push(-2);
 * minStack.push(0);
 * minStack.push(-3);
 * minStack.getMin(); // 返回 -3
 * minStack.pop();
 * minStack.top();    // 返回 0
 * minStack.getMin(); // 返回 -2
 */

/**
 * 方法一：辅助栈（推荐）
 * 时间复杂度：所有操作都是 O(1)
 * 空间复杂度：O(n)
 * 
 * 思路：
 * 1. 使用两个栈：主栈存储所有元素，辅助栈存储最小值
 * 2. push时：主栈正常push，辅助栈push当前最小值
 * 3. pop时：两个栈同时pop
 * 4. getMin时：返回辅助栈的栈顶元素
 */
var MinStack = function() {
    this.stack = [];      // 主栈，存储所有元素
    this.minStack = [];   // 辅助栈，存储对应位置的最小值
};

MinStack.prototype.push = function(val) {
    this.stack.push(val);
    
    // 辅助栈为空或者当前值小于等于辅助栈顶元素时，push当前值
    // 注意：相等时也要push，因为可能有重复的最小值
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
        this.minStack.push(val);
    } else {
        // 否则push当前的最小值（保持两个栈长度一致）
        this.minStack.push(this.minStack[this.minStack.length - 1]);
    }
};

MinStack.prototype.pop = function() {
    if (this.stack.length > 0) {
        this.stack.pop();
        this.minStack.pop();
    }
};

MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function() {
    return this.minStack[this.minStack.length - 1];
};

/**
 * 方法二：优化的辅助栈（空间优化）
 * 时间复杂度：所有操作都是 O(1)
 * 空间复杂度：O(n)，但实际使用空间更少
 * 
 * 思路：
 * 辅助栈只在遇到新的最小值时才push，这样可以节省空间
 */
var MinStack2 = function() {
    this.stack = [];
    this.minStack = [];
};

MinStack2.prototype.push = function(val) {
    this.stack.push(val);
    
    // 只有当辅助栈为空或者当前值小于等于辅助栈顶时才push
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
        this.minStack.push(val);
    }
};

MinStack2.prototype.pop = function() {
    if (this.stack.length > 0) {
        const val = this.stack.pop();
        // 只有当弹出的值等于当前最小值时，才从辅助栈弹出
        if (val === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
    }
};

MinStack2.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};

MinStack2.prototype.getMin = function() {
    return this.minStack[this.minStack.length - 1];
};

/**
 * 方法三：单栈存储差值（进阶，空间最优）
 * 时间复杂度：所有操作都是 O(1)
 * 空间复杂度：O(n)
 * 
 * 思路：
 * 1. 只使用一个栈，存储当前值与最小值的差值
 * 2. 用一个变量记录当前最小值
 * 3. 当差值为负数时，说明当前元素是新的最小值
 */
var MinStack3 = function() {
    this.stack = [];
    this.min = 0; // 记录当前最小值
};

MinStack3.prototype.push = function(val) {
    if (this.stack.length === 0) {
        this.stack.push(0);
        this.min = val;
    } else {
        // 存储当前值与最小值的差值
        this.stack.push(val - this.min);
        if (val < this.min) {
            this.min = val;
        }
    }
};

MinStack3.prototype.pop = function() {
    if (this.stack.length > 0) {
        const diff = this.stack.pop();
        if (diff < 0) {
            // 如果差值为负，说明弹出的是最小值，需要恢复之前的最小值
            this.min = this.min - diff;
        }
    }
};

MinStack3.prototype.top = function() {
    const diff = this.stack[this.stack.length - 1];
    if (diff < 0) {
        return this.min;
    } else {
        return this.min + diff;
    }
};

MinStack3.prototype.getMin = function() {
    return this.min;
};

// 测试用例
console.log("=== 测试方法一：辅助栈 ===");
const minStack1 = new MinStack();
minStack1.push(-2);
minStack1.push(0);
minStack1.push(-3);
minStack1.log();

console.log("getMin():", minStack1.getMin()); // -3
minStack1.pop();
console.log("top():", minStack1.top());       // 0
console.log("getMin():", minStack1.getMin()); // -2
console.log("\n=== 测试方法二：优化辅助栈 ===");
const minStack2 = new MinStack2();
minStack2.push(-2);
minStack2.push(0);
minStack2.push(-3);
console.log("getMin():", minStack2.getMin()); // -3
minStack2.pop();
console.log("top():", minStack2.top());       // 0
console.log("getMin():", minStack2.getMin()); // -2

console.log("\n=== 测试方法三：差值法 ===");
const minStack3 = new MinStack3();
minStack3.push(-2);
minStack3.push(0);
minStack3.push(-3);
console.log("getMin():", minStack3.getMin()); // -3
minStack3.pop();
console.log("top():", minStack3.top());       // 0
console.log("getMin():", minStack3.getMin()); // -2

/**
 * 算法总结：
 * 
 * 1. 方法一（辅助栈）：
 *    - 最容易理解和实现
 *    - 两个栈保持同步，空间使用稳定
 *    - 适合面试时快速实现
 * 
 * 2. 方法二（优化辅助栈）：
 *    - 在方法一基础上优化空间使用
 *    - 只在必要时向辅助栈添加元素
 *    - 平均情况下空间使用更少
 * 
 * 3. 方法三（差值法）：
 *    - 空间使用最优，只用一个栈
 *    - 实现较复杂，需要处理溢出问题
 *    - 适合对空间要求严格的场景
 * 
 * 推荐使用方法一或方法二，它们在实际应用中更加稳定可靠。
 */ 