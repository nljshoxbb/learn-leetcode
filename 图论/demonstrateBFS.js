/**
 * BFS (广度优先搜索) 在岛屿数量问题中的详细执行过程
 */

function demonstrateBFS() {
    console.log("🌊 BFS（广度优先搜索）执行过程详解");
    console.log("=" .repeat(50));
    
    // 使用一个简单的例子来演示BFS过程
    const grid = [
        ["1", "1", "0"],
        ["1", "0", "0"],
        ["0", "1", "1"]
    ];
    
    console.log("\n📋 原始网格:");
    printGridWithCoordinates(grid);
    
    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;
    let step = 0;
    
    function bfsWithVisualization(startRow, startCol) {
        console.log(`\n🌟 开始BFS搜索，起点: (${startRow}, ${startCol})`);
        
        const queue = [[startRow, startCol]];
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // 上下左右
        const visited = new Set();
        let currentLevel = 0;
        
        console.log(`🚀 初始化队列: [${queue.map(pos => `(${pos[0]},${pos[1]})`).join(", ")}]`);
        
        while (queue.length > 0) {
            currentLevel++;
            const queueSizeThisLevel = queue.length;
            
            console.log(`\n--- 第${currentLevel}层搜索 ---`);
            console.log(`📦 当前队列大小: ${queueSizeThisLevel}`);
            console.log(`📍 队列内容: [${queue.map(pos => `(${pos[0]},${pos[1]})`).join(", ")}]`);
            
            // 处理当前层的所有节点
            for (let i = 0; i < queueSizeThisLevel; i++) {
                const [row, col] = queue.shift();
                const posKey = `${row},${col}`;
                
                console.log(`\n  🎯 处理位置: (${row}, ${col})`);
                
                // 检查边界和有效性
                if (row < 0 || row >= rows || col < 0 || col >= cols) {
                    console.log(`    ❌ 越界，跳过`);
                    continue;
                }
                
                if (grid[row][col] === '0') {
                    console.log(`    🌊 是水域，跳过`);
                    continue;
                }
                
                if (visited.has(posKey)) {
                    console.log(`    ✅ 已访问过，跳过`);
                    continue;
                }
                
                // 标记为已访问
                visited.add(posKey);
                grid[row][col] = '0'; // 修改网格以防重复访问
                console.log(`    🏝️ 发现陆地！标记为已访问`);
                
                // 将相邻位置加入队列
                console.log(`    🔍 检查四个方向的邻居:`);
                for (const [dr, dc] of directions) {
                    const newRow = row + dr;
                    const newCol = col + dc;
                    const newPosKey = `${newRow},${newCol}`;
                    
                    console.log(`      👀 检查方向 (${dr > 0 ? '下' : dr < 0 ? '上' : dc > 0 ? '右' : '左'}): (${newRow}, ${newCol})`);
                    
                    // 只有在边界内且是陆地且未访问过的情况下才加入队列
                    if (newRow >= 0 && newRow < rows && 
                        newCol >= 0 && newCol < cols && 
                        grid[newRow][newCol] === '1' && 
                        !visited.has(newPosKey)) {
                        
                        queue.push([newRow, newCol]);
                        console.log(`        ➕ 加入队列: (${newRow}, ${newCol})`);
                    } else {
                        console.log(`        ➖ 不符合条件，不加入`);
                    }
                }
                
                console.log(`    📦 更新后的队列: [${queue.map(pos => `(${pos[0]},${pos[1]})`).join(", ")}]`);
            }
            
            if (queue.length === 0) {
                console.log(`\n🏁 队列为空，该岛屿搜索完成！`);
                break;
            }
        }
    }
    
    // 遍历网格寻找岛屿
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                islandCount++;
                console.log(`\n${'='.repeat(40)}`);
                console.log(`🏝️ 发现第${islandCount}个岛屿，起始位置: (${i}, ${j})`);
                console.log(`${'='.repeat(40)}`);
                
                bfsWithVisualization(i, j);
                
                console.log(`\n✅ 第${islandCount}个岛屿搜索完成`);
                console.log(`📊 当前网格状态:`);
                printGridWithCoordinates(grid);
            }
        }
    }
    
    console.log(`\n🎯 最终结果: 共发现 ${islandCount} 个岛屿`);
}

function printGridWithCoordinates(grid) {
    // 打印列索引
    const colHeaders = "   " + Array.from({length: grid[0].length}, (_, i) => ` ${i}`).join("");
    console.log(colHeaders);
    
    // 打印网格内容
    grid.forEach((row, i) => {
        let rowStr = `${i}: `;
        row.forEach((cell, j) => {
            rowStr += ` ${cell === '1' ? '🏝' : '🌊'}`;
        });
        console.log(rowStr);
    });
}

// 对比BFS和DFS的特点
function compareBFSAndDFS() {
    console.log("\n" + "🔄".repeat(20));
    console.log("🤔 BFS vs DFS 对比分析");
    console.log("🔄".repeat(20));
    
    console.log(`
📊 BFS (广度优先搜索) 特点:
┌─────────────────────────────────────────────────────────┐
│ 🎯 搜索策略: 层层扩展，先搜索距离起点近的节点           │
│ 📦 数据结构: 使用队列 (Queue) - 先进先出                │  
│ 🌊 扩展方式: 像水波纹一样向外扩散                       │
│ 📏 路径特性: 找到的是最短路径                           │
│ 💾 空间复杂度: O(min(M*N, 岛屿大小))                   │
│ ⏱️ 时间复杂度: O(M*N)                                  │
└─────────────────────────────────────────────────────────┘

🔍 DFS (深度优先搜索) 特点:
┌─────────────────────────────────────────────────────────┐
│ 🎯 搜索策略: 深入到底，先沿着一个方向走到头             │
│ 📚 数据结构: 使用栈 (Stack) - 后进先出 (递归调用栈)     │
│ 🕳️ 扩展方式: 像挖洞一样，一条路走到黑                  │
│ 🌿 路径特性: 不一定是最短路径                           │
│ 💾 空间复杂度: O(min(M*N, 岛屿大小)) - 递归栈深度      │
│ ⏱️ 时间复杂度: O(M*N)                                  │
└─────────────────────────────────────────────────────────┘

🎮 形象比喻:
• BFS: 像石头投入水中产生的涟漪，一圈一圈向外扩散
• DFS: 像走迷宫，选择一条路一直走到底，走不通再回头

🛠️ 实际应用选择:
• BFS 适合: 最短路径问题、层序遍历、社交网络分析
• DFS 适合: 拓扑排序、路径搜索、连通性检测

🏝️ 在岛屿问题中:
• 两种方法效果相同，都能正确计算岛屿数量
• BFS 更直观，容易理解扩展过程
• DFS 代码更简洁，递归实现优雅
    `);
}

// 演示执行过程
demonstrateBFS();
compareBFSAndDFS();

console.log("\n🎓 BFS核心理解要点:");
console.log("1️⃣ 队列确保了按层次顺序处理节点");
console.log("2️⃣ 每次从队列头部取出节点，从尾部添加新节点");
console.log("3️⃣ 确保先发现的节点先被处理（层次性）");
console.log("4️⃣ 避免重复访问是关键（使用visited标记或修改原数组）");