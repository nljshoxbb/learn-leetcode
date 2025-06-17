import java.util.*;

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
public class DailyTemperatures {
    
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
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] result = new int[n];
        Stack<Integer> stack = new Stack<>(); // 单调递减栈，存储索引
        
        for (int i = 0; i < n; i++) {
            // 当前温度大于栈顶索引对应的温度时，找到了栈顶的下一个更高温度
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prevIndex = stack.pop();
                result[prevIndex] = i - prevIndex; // 计算天数差
            }
            stack.push(i); // 将当前索引入栈
        }
        
        return result;
    }

    /**
     * 方法二：使用Deque实现（推荐，性能更好）
     * ArrayDeque比Stack性能更好，是官方推荐的栈实现
     */
    public int[] dailyTemperaturesDeque(int[] temperatures) {
        int n = temperatures.length;
        int[] result = new int[n];
        Deque<Integer> stack = new ArrayDeque<>(); // 使用ArrayDeque作为栈
        
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peekLast()]) {
                int prevIndex = stack.removeLast();
                result[prevIndex] = i - prevIndex;
            }
            stack.addLast(i);
        }
        
        return result;
    }
    
    /**
     * 方法三：暴力解法（不推荐，仅供理解）
     * 时间复杂度：O(n²)
     * 空间复杂度：O(1)
     */
    public int[] dailyTemperaturesBruteForce(int[] temperatures) {
        int n = temperatures.length;
        int[] result = new int[n];
        
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (temperatures[j] > temperatures[i]) {
                    result[i] = j - i;
                    break;
                }
            }
        }
        
        return result;
    }
    
    /**
     * 方法四：逆向遍历优化（进阶）
     * 时间复杂度：O(n)
     * 空间复杂度：O(1)
     * 
     * 思路：从右往左遍历，利用已计算的结果进行跳跃
     */
    public int[] dailyTemperaturesReverse(int[] temperatures) {
        int n = temperatures.length;
        int[] result = new int[n];
        
        for (int i = n - 2; i >= 0; i--) {
            int j = i + 1;
            while (j < n && temperatures[j] <= temperatures[i]) {
                if (result[j] == 0) {
                    j = n; // 没有更高温度，跳出
                } else {
                    j += result[j]; // 跳跃到下一个可能的位置
                }
            }
            if (j < n) {
                result[i] = j - i;
            }
        }
        
        return result;
    }
    
    // 工具方法：打印数组
    private static void printArray(int[] arr) {
        System.out.print("[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
            if (i < arr.length - 1) {
                System.out.print(", ");
            }
        }
        System.out.println("]");
    }
    
    // 测试方法
    public static void main(String[] args) {
        DailyTemperatures solution = new DailyTemperatures();
        
        System.out.println("=== 739. 每日温度 Java版本测试 ===\n");
        
        // 测试用例1
        int[] test1 = {73, 74, 75, 71, 69, 72, 76, 73};
        System.out.println("测试用例1:");
        System.out.print("输入: ");
        printArray(test1);
        System.out.print("单调栈输出: ");
        printArray(solution.dailyTemperatures(test1));
        System.out.print("Deque输出: ");
        printArray(solution.dailyTemperaturesDeque(test1));
        System.out.print("暴力解法输出: ");
        printArray(solution.dailyTemperaturesBruteForce(test1));
        System.out.print("逆向遍历输出: ");
        printArray(solution.dailyTemperaturesReverse(test1));
        System.out.println("期望: [1, 1, 4, 2, 1, 1, 0, 0]\n");
        
        // 测试用例2
        int[] test2 = {30, 40, 50, 60};
        System.out.println("测试用例2:");
        System.out.print("输入: ");
        printArray(test2);
        System.out.print("输出: ");
        printArray(solution.dailyTemperatures(test2));
        System.out.println("期望: [1, 1, 1, 0]\n");
        
        // 测试用例3
        int[] test3 = {30, 60, 90};
        System.out.println("测试用例3:");
        System.out.print("输入: ");
        printArray(test3);
        System.out.print("输出: ");
        printArray(solution.dailyTemperatures(test3));
        System.out.println("期望: [1, 1, 0]\n");
        
        // 边界测试
        int[] test4 = {89, 62, 70, 58, 47, 47, 46, 76, 100, 70};
        System.out.println("边界测试:");
        System.out.print("输入: ");
        printArray(test4);
        System.out.print("输出: ");
        printArray(solution.dailyTemperatures(test4));
        System.out.println();
        
        // 性能对比测试
        System.out.println("=== 性能对比测试 ===");
        int[] largeTest = new int[10000];
        Random random = new Random();
        for (int i = 0; i < largeTest.length; i++) {
            largeTest[i] = random.nextInt(100) + 1; // 1-100的随机温度
        }
        
        long startTime, endTime;
        
        // 单调栈性能测试
        startTime = System.nanoTime();
        solution.dailyTemperatures(largeTest);
        endTime = System.nanoTime();
        System.out.println("单调栈耗时: " + (endTime - startTime) / 1000000.0 + " ms");
        
        // Deque性能测试
        startTime = System.nanoTime();
        solution.dailyTemperaturesDeque(largeTest);
        endTime = System.nanoTime();
        System.out.println("Deque耗时: " + (endTime - startTime) / 1000000.0 + " ms");
        
        // 逆向遍历性能测试
        startTime = System.nanoTime();
        solution.dailyTemperaturesReverse(largeTest);
        endTime = System.nanoTime();
        System.out.println("逆向遍历耗时: " + (endTime - startTime) / 1000000.0 + " ms");
    }
}

/**
 * 算法详解：
 * 
 * 1. 单调栈方法：
 *    - 维护一个单调递减的栈，存储数组索引
 *    - 当遇到更大的温度时，弹出栈中所有小于当前温度的索引
 *    - 时间复杂度O(n)，每个元素最多入栈出栈一次
 * 
 * 2. ArrayDeque vs Stack：
 *    - ArrayDeque是双端队列，可以作为栈使用
 *    - 性能比Stack更好，因为Stack继承自Vector，有同步开销
 *    - 推荐使用ArrayDeque替代Stack
 * 
 * 3. 逆向遍历方法：
 *    - 从右往左遍历，利用已计算的结果进行跳跃
 *    - 空间复杂度O(1)，但实际运行时间可能不如单调栈稳定
 * 
 * 4. Java特有的注意点：
 *    - 使用int[]而不是Integer[]，避免装箱拆箱开销
 *    - Stack.peek()获取栈顶，ArrayDeque.peekLast()获取栈顶
 *    - Stack.pop()弹出栈顶，ArrayDeque.removeLast()弹出栈顶
 *    - Stack.push()入栈，ArrayDeque.addLast()入栈
 */ 