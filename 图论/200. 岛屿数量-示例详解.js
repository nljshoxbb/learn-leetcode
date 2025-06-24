/**
 * 200. 岛屿数量 - 详细示例解析
 * 
 * 这个文件展示了各种岛屿配置的详细分析过程
 */

// 打印带颜色和标记的网格
function printColorfulGrid(grid, title, islandMarks = null) {
    console.log("\n" + "=".repeat(40));
    console.log(`📊 ${title}`);
    console.log("=".repeat(40));
    
    // 打印列索引
    const colHeaders = "   " + Array.from({length: grid[0].length}, (_, i) => i).join(" ");
    console.log(colHeaders);
    
    // 打印网格内容
    grid.forEach((row, i) => {
        let rowStr = `${i}: `;
        row.forEach((cell, j) => {
            if (islandMarks && islandMarks[i] && islandMarks[i][j]) {
                rowStr += `${islandMarks[i][j]} `;  // 显示岛屿编号
            } else if (cell === '1') {
                rowStr += "🏝 ";  // 陆地
            } else {
                rowStr += "🌊 ";  // 水
            }
        });
        console.log(rowStr);
    });
}

// 详细分析DFS过程
function analyzeIslandsDFS(grid, title) {
    console.log(`\n🔍 分析案例: ${title}`);
    console.log("策略: 深度优先搜索 (DFS)");
    
    const originalGrid = grid.map(row => [...row]);
    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;
    const islandMarks = Array(rows).fill(null).map(() => Array(cols).fill(null));
    
    // 显示原始网格
    printColorfulGrid(originalGrid, "原始网格");
    
    function dfs(row, col, islandId) {
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === '0') {
            return 0;
        }
        
        console.log(`    🎯 标记位置 (${row}, ${col}) - 岛屿${islandId}`);
        grid[row][col] = '0';  // 标记为已访问
        islandMarks[row][col] = islandId;  // 记录岛屿编号
        
        let size = 1;  // 当前格子的大小
        // 搜索四个方向
        size += dfs(row - 1, col, islandId); // 上
        size += dfs(row + 1, col, islandId); // 下
        size += dfs(row, col - 1, islandId); // 左
        size += dfs(row, col + 1, islandId); // 右
        
        return size;
    }
    
    const islandSizes = [];
    
    // 遍历网格寻找岛屿
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                islandCount++;
                console.log(`\n🌟 发现岛屿${islandCount}，起始坐标: (${i}, ${j})`);
                const size = dfs(i, j, islandCount);
                islandSizes.push(size);
                console.log(`✅ 岛屿${islandCount}搜索完成，大小: ${size}个格子`);
            }
        }
    }
    
    // 显示标记后的网格
    printColorfulGrid(originalGrid, "岛屿标记结果", islandMarks);
    
    console.log(`\n📈 统计结果:`);
    console.log(`• 岛屿总数: ${islandCount}`);
    islandSizes.forEach((size, index) => {
        console.log(`• 岛屿${index + 1}: ${size}个格子`);
    });
    console.log(`• 总陆地面积: ${islandSizes.reduce((sum, size) => sum + size, 0)}个格子`);
    
    return islandCount;
}

// 各种类型的岛屿配置示例
const examples = [
    {
        title: "简单案例 - 单个正方形岛屿",
        grid: [
            ["1", "1", "0"],
            ["1", "1", "0"],
            ["0", "0", "0"]
        ],
        expected: 1,
        description: "一个2x2的正方形岛屿，所有陆地都相连"
    },
    {
        title: "线性岛屿",
        grid: [
            ["1", "1", "1", "1"],
            ["0", "0", "0", "0"],
            ["0", "0", "0", "0"]
        ],
        expected: 1,
        description: "一个水平方向的线性岛屿"
    },
    {
        title: "多个分离的小岛屿",
        grid: [
            ["1", "0", "1", "0", "1"],
            ["0", "0", "0", "0", "0"],
            ["1", "0", "1", "0", "1"]
        ],
        expected: 6,
        description: "6个独立的单格岛屿，彼此不相连"
    },
    {
        title: "复杂形状岛屿",
        grid: [
            ["1", "1", "0", "0", "1"],
            ["1", "0", "0", "1", "1"],
            ["0", "0", "1", "1", "0"],
            ["0", "1", "1", "0", "0"]
        ],
        expected: 3,
        description: "包含不规则形状的多个岛屿"
    },
    {
        title: "环形岛屿",
        grid: [
            ["1", "1", "1"],
            ["1", "0", "1"],
            ["1", "1", "1"]
        ],
        expected: 1,
        description: "中间有水域的环形岛屿"
    },
    {
        title: "大陆架配置",
        grid: [
            ["1", "1", "1", "1", "1"],
            ["1", "0", "0", "0", "1"],
            ["1", "0", "1", "0", "1"],
            ["1", "0", "0", "0", "1"],
            ["1", "1", "1", "1", "1"]
        ],
        expected: 2,
        description: "外围大岛屿包围内部小岛屿"
    }
];

// 运行所有示例
console.log("🏝️  LeetCode 200. 岛屿数量 - 详细示例分析");
console.log("=" .repeat(60));

examples.forEach((example, index) => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📝 示例 ${index + 1}: ${example.title}`);
    console.log(`📖 描述: ${example.description}`);
    console.log(`🎯 预期结果: ${example.expected}个岛屿`);
    
    const result = analyzeIslandsDFS(
        example.grid.map(row => [...row]), 
        example.title
    );
    
    console.log(`\n${result === example.expected ? '✅' : '❌'} 结果验证: ${result === example.expected ? '正确' : '错误'}`);
    console.log(`   实际结果: ${result}, 预期结果: ${example.expected}`);
});

// 算法技巧总结
console.log("\n" + "🎓".repeat(20));
console.log("💡 岛屿数量问题 - 核心技巧总结");
console.log("🎓".repeat(20));

console.log(`
🔑 关键思路:
1. 遍历网格的每个位置
2. 遇到陆地('1')时，岛屿计数+1
3. 使用DFS/BFS将整个岛屿标记为已访问
4. 避免重复计算同一个岛屿

🛠️ 实现技巧:
• 修改原数组: 将访问过的'1'改为'0'，节省空间
• 边界检查: 确保坐标在网格范围内
• 递归终止: 遇到水域或边界时停止搜索
• 四向搜索: 只考虑上下左右四个方向

⚡ 优化策略:
• DFS适合: 简单实现，代码简洁
• BFS适合: 大规模数据，避免栈溢出
• 并查集适合: 动态连通性查询

🎯 应用场景:
• 图像处理: 连通区域检测
• 地理信息: 陆地面积计算
• 网络分析: 连通分量统计
• 游戏开发: 地图区域划分
`);

console.log("\n🏆 掌握岛屿问题，你就掌握了图论中连通性问题的核心！"); 