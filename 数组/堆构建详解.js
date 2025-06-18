/**
 * 堆的构建过程详解
 */

class MinHeapDetailed {
    constructor() {
        this.heap = [];
    }
    
    // 插入元素的详细过程
    push(val) {
        console.log(`\n=== 插入元素 ${val} ===`);
        console.log(`插入前堆状态: [${this.heap.join(', ')}]`);
        
        // 1. 将新元素添加到数组末尾
        this.heap.push(val);
        console.log(`添加到末尾: [${this.heap.join(', ')}]`);
        
        // 2. 执行上浮操作
        this.heapifyUpDetailed(this.heap.length - 1);
        
        console.log(`最终堆状态: [${this.heap.join(', ')}]`);
        this.printTree();
    }
    
    // 详细的上浮过程
    heapifyUpDetailed(index) {
        console.log(`开始上浮操作，从索引 ${index} 开始`);
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            console.log(`当前节点: heap[${index}] = ${this.heap[index]}`);
            console.log(`父节点: heap[${parentIndex}] = ${this.heap[parentIndex]}`);
            
            // 如果父节点小于等于当前节点，满足最小堆性质，停止
            if (this.heap[parentIndex] <= this.heap[index]) {
                console.log(`满足最小堆性质，停止上浮`);
                break;
            }
            
            // 交换当前节点和父节点
            console.log(`交换 heap[${index}] 和 heap[${parentIndex}]`);
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            console.log(`交换后: [${this.heap.join(', ')}]`);
            
            index = parentIndex;
        }
    }
    
    // 删除最小元素的详细过程
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        console.log(`\n=== 删除最小元素 ===`);
        console.log(`删除前堆状态: [${this.heap.join(', ')}]`);
        
        const min = this.heap[0];
        console.log(`要删除的最小元素: ${min}`);
        
        // 1. 将最后一个元素移到根节点
        this.heap[0] = this.heap.pop();
        console.log(`将最后元素移到根部: [${this.heap.join(', ')}]`);
        
        // 2. 执行下沉操作
        if (this.heap.length > 0) {
            this.heapifyDownDetailed(0);
        }
        
        console.log(`最终堆状态: [${this.heap.join(', ')}]`);
        this.printTree();
        
        return min;
    }
    
    // 详细的下沉过程
    heapifyDownDetailed(index) {
        console.log(`开始下沉操作，从索引 ${index} 开始`);
        
        while (true) {
            let minIndex = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            
            console.log(`当前节点: heap[${index}] = ${this.heap[index]}`);
            
            // 比较左子节点
            if (leftChild < this.heap.length) {
                console.log(`左子节点: heap[${leftChild}] = ${this.heap[leftChild]}`);
                if (this.heap[leftChild] < this.heap[minIndex]) {
                    minIndex = leftChild;
                    console.log(`左子节点更小，更新最小索引为 ${minIndex}`);
                }
            }
            
            // 比较右子节点
            if (rightChild < this.heap.length) {
                console.log(`右子节点: heap[${rightChild}] = ${this.heap[rightChild]}`);
                if (this.heap[rightChild] < this.heap[minIndex]) {
                    minIndex = rightChild;
                    console.log(`右子节点更小，更新最小索引为 ${minIndex}`);
                }
            }
            
            // 如果当前节点就是最小的，停止下沉
            if (minIndex === index) {
                console.log(`当前节点已是最小，停止下沉`);
                break;
            }
            
            // 交换当前节点和最小子节点
            console.log(`交换 heap[${index}] 和 heap[${minIndex}]`);
            const swap = this.heap[index];
            this.heap[index] = this.heap[minIndex];
            this.heap[minIndex] = swap;
            console.log(`交换后: [${this.heap.join(', ')}]`);
            
            index = minIndex;
        }
    }
    
    // 可视化打印堆结构
    printTree() {
        if (this.heap.length === 0) {
            console.log('堆为空');
            return;
        }
        
        console.log('\n堆的树形结构:');
        const levels = Math.floor(Math.log2(this.heap.length)) + 1;
        
        for (let level = 0; level < levels; level++) {
            const start = Math.pow(2, level) - 1;
            const end = Math.min(Math.pow(2, level + 1) - 1, this.heap.length);
            
            let levelStr = '';
            for (let i = start; i < end; i++) {
                if (i < this.heap.length) {
                    levelStr += this.heap[i] + ' ';
                }
            }
            console.log(`第${level + 1}层: ${levelStr}`);
        }
        console.log('');
    }
    
    peek() {
        return this.heap[0];
    }
    
    size() {
        return this.heap.length;
    }
}

// 演示堆的构建过程
function demonstrateHeapConstruction() {
    console.log('='.repeat(50));
    console.log('堆的构建过程演示');
    console.log('='.repeat(50));
    
    const heap = new MinHeapDetailed();
    const elements = [15, 10, 20, 8, 25, 5, 7];
    
    console.log(`将要插入的元素: [${elements.join(', ')}]`);
    
    // 逐个插入元素
    elements.forEach(element => {
        heap.push(element);
    });
    
    console.log('\n' + '='.repeat(30));
    console.log('堆构建完成！');
    console.log('='.repeat(30));
    
    // 演示删除过程
    console.log('\n现在演示删除过程:');
    while (heap.size() > 0) {
        const min = heap.pop();
        console.log(`删除的最小元素: ${min}`);
    }
}

// 批量构建堆 vs 逐个插入的对比
function compareHeapConstruction() {
    console.log('\n' + '='.repeat(50));
    console.log('批量构建堆 vs 逐个插入的对比');
    console.log('='.repeat(50));
    
    const array = [15, 10, 20, 8, 25, 5, 7, 6, 12, 18];
    
    console.log('方法一：逐个插入构建堆');
    console.log('时间复杂度：O(n log n)');
    const heap1 = new MinHeapDetailed();
    array.forEach(num => heap1.push(num));
    
    console.log('\n方法二：批量构建堆（自底向上）');
    console.log('时间复杂度：O(n)');
    heapifyArray(array);
}

// 自底向上构建堆（更高效的方法）
function heapifyArray(arr) {
    console.log(`原数组: [${arr.join(', ')}]`);
    
    // 从最后一个非叶子节点开始，向上进行下沉操作
    const lastNonLeafIndex = Math.floor((arr.length - 1 - 1) / 2);
    console.log(`最后一个非叶子节点索引: ${lastNonLeafIndex}`);
    
    for (let i = lastNonLeafIndex; i >= 0; i--) {
        console.log(`\n对节点 ${i} (值=${arr[i]}) 执行下沉操作:`);
        heapifyDown(arr, i, arr.length);
        console.log(`结果: [${arr.join(', ')}]`);
    }
    
    console.log(`\n最终最小堆: [${arr.join(', ')}]`);
    return arr;
}

function heapifyDown(arr, index, heapSize) {
    while (true) {
        let minIndex = index;
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;
        
        if (leftChild < heapSize && arr[leftChild] < arr[minIndex]) {
            minIndex = leftChild;
        }
        if (rightChild < heapSize && arr[rightChild] < arr[minIndex]) {
            minIndex = rightChild;
        }
        
        if (minIndex === index) break;
        
        [arr[index], arr[minIndex]] = [arr[minIndex], arr[index]];
        index = minIndex;
    }
}

// 可视化演示
function visualizeHeapIndexes() {
    console.log('堆的数组索引关系可视化：\n');
    
    // 创建一个示例堆
    const heap = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    
    console.log('数组: [A, B, C, D, E, F, G, H, I]');
    console.log('索引: [0, 1, 2, 3, 4, 5, 6, 7, 8]\n');
    
    console.log('树形结构:');
    console.log('        A(0)');
    console.log('       /    \\');
    console.log('    B(1)    C(2)');
    console.log('   /  \\    /  \\');
    console.log(' D(3) E(4) F(5) G(6)');
    console.log(' / \\');
    console.log('H(7) I(8)\n');
    
    console.log('索引关系验证:');
    for (let i = 0; i < heap.length; i++) {
        const parent = i > 0 ? Math.floor((i - 1) / 2) : null;
        const leftChild = 2 * i + 1 < heap.length ? 2 * i + 1 : null;
        const rightChild = 2 * i + 2 < heap.length ? 2 * i + 2 : null;
        
        console.log(`节点 ${heap[i]}(${i}):`);
        if (parent !== null) {
            console.log(`  父节点: ${heap[parent]}(${parent})`);
        }
        if (leftChild !== null) {
            console.log(`  左子: ${heap[leftChild]}(${leftChild})`);
        }
        if (rightChild !== null) {
            console.log(`  右子: ${heap[rightChild]}(${rightChild})`);
        }
        console.log('');
    }
}

// 层次遍历的规律
function explainLevelOrderPattern() {
    console.log('层次遍历的数学规律:\n');
    
    const levels = [
        { level: 0, range: '0-0', count: 1, formula: '2^0 = 1' },
        { level: 1, range: '1-2', count: 2, formula: '2^1 = 2' },
        { level: 2, range: '3-6', count: 4, formula: '2^2 = 4' },
        { level: 3, range: '7-14', count: 8, formula: '2^3 = 8' }
    ];
    
    console.log('层级 | 索引范围 | 节点数 | 公式');
    console.log('-----|----------|--------|--------');
    levels.forEach(l => {
        console.log(`  ${l.level}  |   ${l.range}   |   ${l.count}    | ${l.formula}`);
    });
    
    console.log('\n关键观察:');
    console.log('1. 第k层的第一个节点索引 = 2^k - 1');
    console.log('2. 第k层的最后一个节点索引 = 2^(k+1) - 2');
    console.log('3. 每层节点数 = 2^k');
    console.log('4. 父子关系遵循 2倍+1, 2倍+2 的规律');
}

// 运行演示
demonstrateHeapConstruction();
// compareHeapConstruction();
// visualizeHeapIndexes();
// explainLevelOrderPattern();

// module.exports = { MinHeapDetailed }; 