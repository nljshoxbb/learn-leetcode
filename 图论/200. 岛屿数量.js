/**
 * 200. 岛屿数量
 * 
 * 题目描述：
 * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
 * 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
 * 此外，你可以假设该网格的四条边均被水包围。
 */

// ====================== 方法一：DFS（深度优先搜索） ======================
/**
 * 使用DFS标记岛屿
 * 时间复杂度：O(M×N)，其中M和N分别是网格的行数和列数
 * 空间复杂度：O(M×N)，最坏情况下递归深度为M×N
 */
var numIslands = function(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;
    
    // DFS函数：标记与当前位置相连的所有陆地
    function dfs(row, col) {
        // 边界检查和水域检查
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === '0') {
            return;
        }
        
        // 标记当前陆地为已访问（设为'0'）
        grid[row][col] = '0';
        
        // 递归搜索四个方向
        dfs(row - 1, col); // 上
        dfs(row + 1, col); // 下
        dfs(row, col - 1); // 左
        dfs(row, col + 1); // 右
    }
    
    // 遍历整个网格
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                // 发现新岛屿，岛屿数量+1
                islandCount++;
                // 使用DFS标记整个岛屿
                dfs(i, j);
            }
        }
    }
    
    return islandCount;
};

// ====================== 方法二：BFS（广度优先搜索） ======================

var numIslandsBFS = function(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;
    
    // BFS函数：标记与当前位置相连的所有陆地
    function bfs(startRow, startCol) {
        const queue = [[startRow, startCol]];
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // 上下左右
        
        while (queue.length > 0) {
            const [row, col] = queue.shift();
            
            // 检查边界和是否为陆地
            if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === '0') {
                continue;
            }
            
            // 标记当前陆地为已访问
            grid[row][col] = '0';
            // 将相邻的陆地加入队列
            for (const [dr, dc] of directions) {
                queue.push([row + dr, col + dc]);
            }
        }
    }

    
    // 遍历整个网格
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                islandCount++;
                bfs(i, j);
            }
        }
    }
    
    return islandCount;
};

// ====================== 可视化演示函数 ======================

function numIslandsWithVisualization(grid) {
    if (!grid || grid.length === 0) return 0;
    
    // 创建原始网格的副本用于显示
    const originalGrid = grid.map(row => [...row]);
    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;
    
    console.log("\n🏝️  岛屿数量问题 - 可视化演示");
    console.log("==========================================");
    
    // 显示原始网格
    console.log("\n📋 原始网格:");
    printGrid(originalGrid);
    
    function dfs(row, col, islandId) {
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === '0') {
            return;
        }
        
        console.log(`  🔍 访问位置 (${row}, ${col})`);
        grid[row][col] = '0'; // 标记为已访问
        
        // 递归搜索四个方向
        dfs(row - 1, col, islandId); // 上
        dfs(row + 1, col, islandId); // 下
        dfs(row, col - 1, islandId); // 左
        dfs(row, col + 1, islandId); // 右
    }
    
    // 遍历网格寻找岛屿
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                islandCount++;
                console.log(`\n🌟 发现第${islandCount}个岛屿，起始位置: (${i}, ${j})`);
                console.log(`开始DFS搜索...`);
                dfs(i, j, islandCount);
                console.log(`✅ 第${islandCount}个岛屿搜索完成`);
            }
        }
    }
    
    console.log(`\n🎯 最终结果: 共发现 ${islandCount} 个岛屿`);
    return islandCount;
}

/**
 * 打印网格的辅助函数
 */
function printGrid(grid) {
    console.log("   " + Array.from({length: grid[0].length}, (_, i) => i).join(" "));
    grid.forEach((row, i) => {
        console.log(`${i}: [${row.join(",")}]`);
    });
}

// ====================== 测试用例 ======================

function testNumIslands() {
    console.log("=== 测试 LeetCode 200. 岛屿数量 ===\n");
    
    const testCases = [
        {
            name: "示例1 - 单个大岛屿",
            grid: [
                ["1","1","1","1","0"],
                ["1","1","0","1","0"],
                ["1","1","0","0","0"],
                ["0","0","0","0","0"]
            ],
            expected: 1
        },
        {
            name: "示例2 - 多个独立岛屿",
            grid: [
                ["1","1","0","0","0"],
                ["1","1","0","0","0"],
                ["0","0","1","0","0"],
                ["0","0","0","1","1"]
            ],
            expected: 3
        },
        {
            name: "示例3 - 复杂形状岛屿",
            grid: [
                ["1","0","1","1","1"],
                ["1","0","1","0","1"],
                ["0","0","1","0","0"],
                ["1","1","0","1","1"]
            ],
            expected: 4
        },
        {
            name: "示例4 - 全是水",
            grid: [
                ["0","0","0"],
                ["0","0","0"],
                ["0","0","0"]
            ],
            expected: 0
        },
        {
            name: "示例5 - 全是陆地",
            grid: [
                ["1","1","1"],
                ["1","1","1"],
                ["1","1","1"]
            ],
            expected: 1
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\n--- 测试案例 ${index + 1}: ${testCase.name} ---`);
        
        // 为每种方法创建网格副本（因为DFS会修改原数组）
        const gridDFS = testCase.grid.map(row => [...row]);
        const gridBFS = testCase.grid.map(row => [...row]);
        
        const resultDFS = numIslands(gridDFS);
        const resultBFS = numIslandsBFS(gridBFS);
        
        console.log(`DFS结果: ${resultDFS}`);
        console.log(`BFS结果: ${resultBFS}`);
        console.log(`期望结果: ${testCase.expected}`);
        
        const allCorrect = resultDFS === testCase.expected && resultBFS === testCase.expected;
        
        console.log(`测试结果: ${allCorrect ? '✅ 全部通过' : '❌ 存在错误'}`);
    });
}

// 运行测试
testNumIslands();

// 演示可视化过程
console.log("\n" + "=".repeat(50));
console.log("🎬 可视化演示");
console.log("=".repeat(50));

const demoGrid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
];

numIslandsWithVisualization(demoGrid.map(row => [...row]));

// ====================== 算法分析 ======================

console.log("\n" + "=".repeat(50));
console.log("📊 算法复杂度分析");
console.log("=".repeat(50));

console.log("\n🔍 两种方法对比:");
console.log("1️⃣  DFS (深度优先搜索)");
console.log("   ⏱️  时间复杂度: O(M×N)");
console.log("   💾 空间复杂度: O(M×N) - 最坏情况递归栈深度");
console.log("   ✅ 优点: 代码简洁，易于理解");
console.log("   ❌ 缺点: 可能栈溢出（大网格）");
console.log("");
console.log("2️⃣  BFS (广度优先搜索)");
console.log("   ⏱️  时间复杂度: O(M×N)");
console.log("   💾 空间复杂度: O(min(M,N)) - 队列大小");
console.log("   ✅ 优点: 空间效率更高，不会栈溢出");
console.log("   ❌ 缺点: 需要额外的队列存储");

console.log("\n🌟 核心思想总结:");
console.log("• 岛屿问题本质是寻找连通分量");
console.log("• 遍历网格，遇到陆地就启动搜索");
console.log("• 通过DFS/BFS标记整个岛屿避免重复计算");
console.log("• 每次搜索完成，岛屿数量+1");

console.log("\n🚀 相关问题:");
console.log("• LeetCode 695: 岛屿的最大面积");
console.log("• LeetCode 463: 岛屿的周长");
console.log("• LeetCode 827: 最大人工岛");
console.log("• LeetCode 1020: 飞地的数量"); 