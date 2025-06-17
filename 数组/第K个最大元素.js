/**
 * 215. 数组中的第K个最大元素
 * 
 * 题目描述：
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
 * 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 * 
 * 示例 1:
 * 输入: [3,2,1,5,6,4] 和 k = 2
 * 输出: 5
 * 
 * 示例 2:
 * 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
 * 输出: 4
 */

// 方法一：排序法 - 最简单直接的方法
// 时间复杂度：O(n log n)，空间复杂度：O(1)
function findKthLargest1(nums, k) {
    // 降序排序，然后返回第k-1个元素（因为索引从0开始）
    nums.sort((a, b) => b - a);
    return nums[k - 1];
}

// 方法二：小顶堆法 - 维护一个大小为k的小顶堆
// 时间复杂度：O(n log k)，空间复杂度：O(k)
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    size() {
        return this.heap.length;
    }
    
    peek() {
        return this.heap[0];
    }
    
    push(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }
    
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }
    
    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] <= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }
    
    heapifyDown(index) {
        while (true) {
            let minIndex = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            
            if (leftChild < this.heap.length && this.heap[leftChild] < this.heap[minIndex]) {
                minIndex = leftChild;
            }
            if (rightChild < this.heap.length && this.heap[rightChild] < this.heap[minIndex]) {
                minIndex = rightChild;
            }
            
            if (minIndex === index) break;
            [this.heap[index], this.heap[minIndex]] = [this.heap[minIndex], this.heap[index]];
            index = minIndex;
        }
    }
}

function findKthLargest2(nums, k) {
    const minHeap = new MinHeap();
    
    for (const num of nums) {
        minHeap.push(num);
        // 如果堆的大小超过k，移除最小元素
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }
    
    // 堆顶就是第k个最大元素
    return minHeap.peek();
}

// 方法三：快速选择算法 - 基于快速排序的分治思想
// 平均时间复杂度：O(n)，最坏时间复杂度：O(n²)，空间复杂度：O(1)
function findKthLargest3(nums, k) {
    // 第k个最大元素在降序数组中的索引是k-1
    return quickSelect(nums, 0, nums.length - 1, k - 1);
}

function quickSelect(nums, left, right, k) {
    if (left === right) return nums[left];
    
    // 随机选择pivot，避免最坏情况
    const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
    [nums[randomIndex], nums[right]] = [nums[right], nums[randomIndex]];
    
    // 分区操作，返回pivot的最终位置
    const pivotIndex = partition(nums, left, right);
    
    if (pivotIndex === k) {
        return nums[pivotIndex];
    } else if (pivotIndex > k) {
        // 第k大的元素在左半部分
        return quickSelect(nums, left, pivotIndex - 1, k);
    } else {
        // 第k大的元素在右半部分
        return quickSelect(nums, pivotIndex + 1, right, k);
    }
}

function partition(nums, left, right) {
    const pivot = nums[right];
    let i = left;
    
    // 将大于pivot的元素放在左边，小于pivot的元素放在右边（降序）
    for (let j = left; j < right; j++) {
        if (nums[j] >= pivot) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            i++;
        }
    }
    
    [nums[i], nums[right]] = [nums[right], nums[i]];
    return i;
}

// 方法四：使用JavaScript内置的优先队列（基于数组实现）
// 时间复杂度：O(n log k)，空间复杂度：O(k)
function findKthLargest4(nums, k) {
    // 维护一个大小为k的数组，保持有序
    const heap = [];
    
    for (const num of nums) {
        if (heap.length < k) {
            heap.push(num);
            heap.sort((a, b) => a - b); // 升序排序，最小值在前
        } else if (num > heap[0]) {
            heap[0] = num;
            heap.sort((a, b) => a - b);
        }
    }
    
    return heap[0];
}

// 测试函数
function test() {
    const testCases = [
        { nums: [3, 2, 1, 5, 6, 4], k: 2, expected: 5 },
        { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4, expected: 4 },
        { nums: [1], k: 1, expected: 1 },
        { nums: [1, 2], k: 1, expected: 2 },
        { nums: [2, 1], k: 2, expected: 1 }
    ];
    
    const methods = [
        { name: '排序法', func: findKthLargest1 },
        { name: '小顶堆法', func: findKthLargest2 },
        { name: '快速选择法', func: findKthLargest3 },
        { name: '简化堆法', func: findKthLargest4 }
    ];
    
    console.log('=== 数组中的第K个最大元素 - 测试结果 ===\n');
    
    testCases.forEach((testCase, index) => {
        console.log(`测试用例 ${index + 1}:`);
        console.log(`输入: nums = [${testCase.nums.join(', ')}], k = ${testCase.k}`);
        console.log(`期望输出: ${testCase.expected}`);
        console.log('各方法结果:');
        
        methods.forEach(method => {
            // 创建数组副本，避免原数组被修改
            const numsCopy = [...testCase.nums];
            const result = method.func(numsCopy, testCase.k);
            const status = result === testCase.expected ? '✅' : '❌';
            console.log(`  ${method.name}: ${result} ${status}`);
        });
        
        console.log('');
    });
    
    // 性能测试
    console.log('=== 性能测试 ===');
    const largeArray = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 10000));
    const k = 100;
    
    methods.forEach(method => {
        const start = performance.now();
        const numsCopy = [...largeArray];
        method.func(numsCopy, k);
        const end = performance.now();
        console.log(`${method.name}: ${(end - start).toFixed(2)}ms`);
    });
}

// 算法复杂度分析
console.log(`
算法复杂度分析：

1. 排序法：
   - 时间复杂度：O(n log n)
   - 空间复杂度：O(1)
   - 优点：实现简单，代码清晰
   - 缺点：时间复杂度较高

2. 小顶堆法：
   - 时间复杂度：O(n log k)
   - 空间复杂度：O(k)
   - 优点：当k较小时效率很高
   - 缺点：需要额外的堆数据结构

3. 快速选择法：
   - 平均时间复杂度：O(n)
   - 最坏时间复杂度：O(n²)
   - 空间复杂度：O(1)
   - 优点：平均情况下最优
   - 缺点：最坏情况下退化

4. 简化堆法：
   - 时间复杂度：O(n k log k)
   - 空间复杂度：O(k)
   - 优点：实现简单
   - 缺点：效率不如专门的堆实现

推荐使用：
- 面试时推荐快速选择法（展示算法功底）
- 实际项目中可以使用排序法（简单可靠）
- 当k很小时使用堆方法
`);

// 运行测试
test();

module.exports = {
    findKthLargest1,
    findKthLargest2,
    findKthLargest3,
    findKthLargest4,
    MinHeap
}; 