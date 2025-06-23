/**
 * 207. 课程表
 * 
 * 题目描述：
 * 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。
 * 在选修某些课程之前需要一些先修课程。先修课程按数组 prerequisites 给出，
 * 其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程 bi 。
 * 
 * 例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
 * 请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。
 * 
 * 示例 1：
 * 输入：numCourses = 2, prerequisites = [[1,0]]
 * 输出：true
 * 解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。
 * 
 * 示例 2：
 * 输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
 * 输出：false
 * 解释：总共有 2 门课程。学习课程 1 之前，你需要先完成课程 0 ；
 *      并且学习课程 0 之前，你需要先完成课程 1 。这是不可能的。
 */

// ====================== 方法一：Kahn算法（BFS实现） ======================

/**
 * 使用Kahn算法检测有向图是否存在环
 * 时间复杂度：O(V + E)，其中V是课程数，E是先修关系数
 * 空间复杂度：O(V + E)
 * 
 * @param {number} numCourses 课程总数
 * @param {number[][]} prerequisites 先修课程关系
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    // 1. 构建邻接表和入度数组
    const graph = new Array(numCourses).fill(0).map(() => []);
    const inDegree = new Array(numCourses).fill(0);
    
    // 构建图：prerequisites[i] = [ai, bi] 表示要学ai必须先学bi
    // 所以是 bi → ai 这条边
    for (const [course, prerequisite] of prerequisites) {
        graph[prerequisite].push(course);  // prerequisite指向course
        inDegree[course]++;  // course的入度加1
    }
    
    // 2. 找到所有入度为0的课程（没有先修要求的课程）
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }
    
    // 3. BFS处理：每次取出入度为0的课程
    let completedCourses = 0;
    
    while (queue.length > 0) {
        const course = queue.shift();
        completedCourses++;
        
        // 移除该课程后，更新依赖它的其他课程的入度
        for (const nextCourse of graph[course]) {
            inDegree[nextCourse]--;
            
            // 如果某课程入度变为0，说明它的所有先修课程都已完成
            if (inDegree[nextCourse] === 0) {
                queue.push(nextCourse);
            }
        }
    }
    
    // 4. 如果能完成所有课程，说明无环；否则有环
    return completedCourses === numCourses;
};

// ====================== 方法二：DFS实现 ======================

/**
 * 使用DFS检测有向图是否存在环
 * 核心思想：如果在DFS过程中遇到正在访问的节点，说明存在环
 * 
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinishDFS = function(numCourses, prerequisites) {
    // 构建邻接表
    const graph = new Array(numCourses).fill(0).map(() => []);
    
    for (const [course, prerequisite] of prerequisites) {
        graph[prerequisite].push(course);
    }
    
    // 节点状态：0=未访问，1=访问中，2=已完成
    const state = new Array(numCourses).fill(0);
    
    // DFS函数：检测从node开始是否存在环
    function hasCycle(node) {
        if (state[node] === 1) {
            // 遇到正在访问的节点，说明存在环
            return true;
        }
        if (state[node] === 2) {
            // 已经访问完成的节点，不会有环
            return false;
        }
        
        // 标记为正在访问
        state[node] = 1;
        
        // 递归访问所有邻接节点
        for (const neighbor of graph[node]) {
            if (hasCycle(neighbor)) {
                return true;
            }
        }
        
        // 标记为访问完成
        state[node] = 2;
        return false;
    }
    
    // 对每个节点进行DFS检测
    for (let i = 0; i < numCourses; i++) {
        if (hasCycle(i)) {
            return false;
        }
    }
    
    return true;
};

// ====================== 测试用例 ======================

// 测试函数
function testCanFinish() {
    console.log("=== 测试 LeetCode 207. 课程表 ===\n");
    
    const testCases = [
        {
            numCourses: 2,
            prerequisites: [[1, 0]],
            expected: true,
            description: "两门课程，1依赖0"
        },
        {
            numCourses: 2,
            prerequisites: [[1, 0], [0, 1]],
            expected: false,
            description: "两门课程，相互依赖（存在环）"
        },
        {
            numCourses: 4,
            prerequisites: [[1, 0], [2, 1], [3, 2]],
            expected: true,
            description: "四门课程，线性依赖链"
        },
        {
            numCourses: 4,
            prerequisites: [[1, 0], [2, 1], [3, 2], [0, 3]],
            expected: false,
            description: "四门课程，形成环路"
        },
        {
            numCourses: 5,
            prerequisites: [[1, 4], [2, 4], [3, 1], [3, 2]],
            expected: true,
            description: "复杂依赖关系，无环"
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`测试案例 ${index + 1}: ${testCase.description}`);
        console.log(`输入: numCourses = ${testCase.numCourses}, prerequisites = ${JSON.stringify(testCase.prerequisites)}`);
        
        const resultKahn = canFinish(testCase.numCourses, testCase.prerequisites);
        const resultDFS = canFinishDFS(testCase.numCourses, testCase.prerequisites);
        
        console.log(`Kahn算法结果: ${resultKahn}`);
        console.log(`DFS算法结果: ${resultDFS}`);
        console.log(`期望结果: ${testCase.expected}`);
        console.log(`Kahn算法 ${resultKahn === testCase.expected ? '✅ 通过' : '❌ 失败'}`);
        console.log(`DFS算法 ${resultDFS === testCase.expected ? '✅ 通过' : '❌ 失败'}`);
        console.log('---');
    });
}

// 运行测试
testCanFinish();

// ====================== 算法分析 ======================

/**
 * 时间复杂度分析：
 * - Kahn算法：O(V + E)，每个顶点和每条边都被处理一次
 * - DFS算法：O(V + E)，每个顶点最多被访问一次，每条边被检查一次
 * 
 * 空间复杂度分析：
 * - Kahn算法：O(V + E)，邻接表 + 入度数组 + 队列
 * - DFS算法：O(V + E)，邻接表 + 状态数组 + 递归栈
 * 
 * 算法选择建议：
 * 1. Kahn算法：更直观易懂，适合理解拓扑排序的过程
 * 2. DFS算法：代码更简洁，适合检测环的存在
 * 3. 在实际应用中，如果需要拓扑排序的结果，用Kahn；如果只需判断是否有环，用DFS
 */

/**
 * 核心思想总结：
 * 
 * 这道题本质上是检测有向图中是否存在环：
 * - 如果存在环，则无法完成所有课程（因为环上的课程相互依赖）
 * - 如果无环，则可以通过拓扑排序找到学习顺序
 * 
 * 拓扑排序的应用场景：
 * - 课程安排
 * - 项目调度
 * - 编译依赖
 * - 任务调度
 */ 