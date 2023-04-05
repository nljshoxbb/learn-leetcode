class MonoQueue {
  constructor() {
    this.queue = [];
  }
  enqueue(value) {
    let back = this.queue[this.queue.length - 1];
    /** 加入元素比前面元素大，则把前面元素剔除 */
    while (back !== undefined && back < value) {
      this.queue.pop();
      back = this.queue[this.queue.length - 1];
    }
    this.queue.push(value);
  }
  dequeue(value) {
    let front = this.front();
    if (front === value) {
      this.queue.shift();
    }
  }

  front() {
    return this.queue[0];
  }

  getVal() {
    console.log(this.queue);
  }
}

var maxSildingWindow = function (nums, k) {
  let helperQueue = new MonoQueue();
  let i = 0,
    j = 0;
  let resArr = [];
  // 先将前k个元素放入队列
  while (j < k) {
    helperQueue.enqueue(nums[j++]);
  }
  // 记录前k个元素的最大值
  resArr.push(helperQueue.front());

  while (j < nums.length) {
    helperQueue.getVal();
    console.log(nums[i], nums[j]);
    // 滑动窗口添加最后面的元素
    helperQueue.enqueue(nums[j]);
    // 滑动窗口移除最前面的元素
    helperQueue.dequeue(nums[i]);
    // 记录最大值
    resArr.push(helperQueue.front());
    i++;
    j++;
  }
  return resArr;
};

const nums = [1, 3, -1, -3, 5, 3, 6, 7],
  k = 3;

const val = maxSildingWindow(nums, k);
console.log(val);
