/**
 * 207. 课程表 - 详细示例与可视化
 * 
 * 这个文件提供了详细的可视化例子，帮助理解算法执行过程
 */

/**
 * 带详细过程输出的Kahn算法实现
 */
function canFinishWithDetails(numCourses, prerequisites) {
    console.log(`\n=== 开始分析课程安排 ===`);
    console.log(`总课程数: ${numCourses}`);
    console.log(`先修关系: ${JSON.stringify(prerequisites)}`);
    
    // 1. 构建图结构
    console.log(`\n步骤1: 构建图结构`);
    const graph = new Array(numCourses).fill(0).map(() => []);
    const inDegree = new Array(numCourses).fill(0);
    
    for (const [course, prerequisite] of prerequisites) {
        graph[prerequisite].push(course);
        inDegree[course]++;
        console.log(`  添加依赖: 课程${prerequisite} → 课程${course}`);
    }
    
    console.log(`\n图结构 (邻接表):`);
    for (let i = 0; i < numCourses; i++) {
        if (graph[i].length > 0) {
            console.log(`  课程${i} → [${graph[i].join(', ')}]`);
        }
    }
    
    console.log(`\n各课程入度 (需要多少先修课程):`);
    for (let i = 0; i < numCourses; i++) {
        console.log(`  课程${i}: ${inDegree[i]}个先修课程`);
    }
    
    // 2. 找到可以立即开始的课程（入度为0）
    console.log(`\n步骤2: 寻找可以立即开始的课程`);
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
            console.log(`  课程${i}无先修要求，可以立即开始`);
        }
    }
    
    if (queue.length === 0) {
        console.log(`  ❌ 没有课程可以立即开始，存在循环依赖！`);
        return false;
    }
    
    // 3. 模拟学习过程
    console.log(`\n步骤3: 模拟学习过程`);
    let completedCourses = 0;
    let semester = 1;
    
    while (queue.length > 0) {
        console.log(`\n--- 第${semester}学期 ---`);
        const currentSemester = [...queue];  // 这学期可以上的课
        queue.length = 0;  // 清空队列
        
        console.log(`本学期可以学习的课程: [${currentSemester.join(', ')}]`);
        
        // 完成这学期的所有课程
        for (const course of currentSemester) {
            completedCourses++;
            console.log(`✅ 完成课程${course}`);
            
            // 检查哪些课程的先修要求得到满足
            for (const nextCourse of graph[course]) {
                inDegree[nextCourse]--;
                console.log(`  课程${nextCourse}的先修要求减少1，还需${inDegree[nextCourse]}门先修课程`);
                
                if (inDegree[nextCourse] === 0) {
                    queue.push(nextCourse);
                    console.log(`  🎉 课程${nextCourse}的所有先修要求已满足，下学期可以学习！`);
                }
            }
        }
        
        console.log(`本学期完成后，已完成${completedCourses}门课程`);
        
        if (queue.length > 0) {
            console.log(`下学期待学课程: [${queue.join(', ')}]`);
        }
        
        semester++;
    }
    
    // 4. 最终结果
    console.log(`\n=== 最终结果 ===`);
    const canComplete = completedCourses === numCourses;
    
    if (canComplete) {
        console.log(`✅ 成功！可以完成所有${numCourses}门课程`);
        console.log(`总共需要${semester - 1}个学期`);
    } else {
        console.log(`❌ 失败！只能完成${completedCourses}门课程，还有${numCourses - completedCourses}门课程无法完成`);
        console.log(`原因: 存在循环依赖，无法找到学习顺序`);
        
        // 找出哪些课程形成了循环
        console.log(`\n未完成的课程及其依赖情况:`);
        for (let i = 0; i < numCourses; i++) {
            if (inDegree[i] > 0) {
                console.log(`  课程${i}: 仍需${inDegree[i]}门先修课程`);
            }
        }
    }
    
    return canComplete;
}

// ====================== 具体示例演示 ======================

console.log("🎓 LeetCode 207. 课程表 - 详细示例演示");

// 示例1: 简单的线性依赖
console.log("\n" + "=".repeat(50));
console.log("示例1: 简单线性依赖");
console.log("课程安排: 微积分 → 线性代数 → 概率论");
canFinishWithDetails(3, [[1, 0], [2, 1]]);

// 示例2: 存在循环依赖
console.log("\n" + "=".repeat(50));
console.log("示例2: 循环依赖问题");
console.log("问题: A依赖B，B依赖A");
canFinishWithDetails(2, [[0, 1], [1, 0]]);

// 示例3: 复杂的依赖关系
console.log("\n" + "=".repeat(50));
console.log("示例3: 复杂依赖关系");
console.log("计算机科学课程体系:");
console.log("0: 数学基础, 1: 程序设计, 2: 数据结构, 3: 算法, 4: 数据库");
canFinishWithDetails(5, [
    [1, 0],  // 程序设计需要数学基础
    [2, 0],  // 数据结构需要数学基础  
    [2, 1],  // 数据结构需要程序设计
    [3, 2],  // 算法需要数据结构
    [4, 1]   // 数据库需要程序设计
]);

// 示例4: 包含循环的复杂情况
console.log("\n" + "=".repeat(50));
console.log("示例4: 包含循环的复杂依赖");
console.log("存在A→B→C→A的循环");
canFinishWithDetails(4, [
    [1, 0],  // B依赖A
    [2, 1],  // C依赖B  
    [0, 2],  // A依赖C (形成循环)
    [3, 1]   // D依赖B
]);

/**
 * 总结：拓扑排序在实际中的应用
 */
console.log("\n" + "=".repeat(50));
console.log("📚 拓扑排序的实际应用场景:");
console.log("1. 📖 大学课程安排系统");
console.log("2. 🏗️  项目任务调度");
console.log("3. 💻 软件包依赖管理 (npm, maven等)");
console.log("4. 🔧 编译系统中的依赖处理");
console.log("5. 🎯 制造业工序安排");
console.log("6. 🧬 生物学中的基因调控网络");

console.log("\n🔍 关键概念:");
console.log("• 入度 = 依赖该节点的前置条件数量");
console.log("• 出度 = 该节点作为前置条件的后续节点数量");
console.log("• 拓扑排序 = 将偏序关系转换为全序关系");
console.log("• 环检测 = 判断是否存在循环依赖"); 