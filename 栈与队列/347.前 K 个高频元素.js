class Heap {
  constructor(compareFn) {
    this.compareFn = compareFn;
    this.queue = [];
  }

  // 添加 上浮过程
  push(item) {
    // 因为为完全二叉树，从堆角度看，则是从数组末尾进行添加
    this.queue.push(item);
    let index = this.size() - 1; // 记录推入元素下标
    let parent = Math.floor((index - 1) / 2); // 记录父节点下标

    while (parent >= 0 && this.compare(parent, index) > 0) {
      // 子节点比父节点大/小，则换位
      [this.queue[index], this.queue[parent]] = [this.queue[parent], this.queue[index]];

      // 更新下标
      index = parent;
      parent = Math.floor((index - 1) / 2);
    }
  }

  // 获取堆顶元素并移除 下沉过程
  pop() {
    // 堆顶元素
    const out = this.queue[0];

    // 移除堆顶元素 填入最后一个元素
    this.queue[0] = this.queue.pop();

    // 下沉
    let index = 0; // 记录下沉元素下标
    let left = 1; // left 是左子节点下标 left+1 则是右子节点下标
    let right = left + 1;
    let searchChild = this.compare(left, right) > 0 ? right : left;

    while (searchChild !== undefined && this.compare(index, searchChild) > 0) {
      [this.queue[index], this.queue[searchChild]] = [this.queue[searchChild], this.queue[index]];

      // 更新下标
      index = searchChild;
      left = 2 * index + 1;
      right = left + 1;
      searchChild = this.compare(left, right) > 0 ? right : left;
    }

    return out;
  }

  size() {
    return this.queue.length;
  }

  compare(index1, index2) {
    // 处理下标越界问题
    if (this.queue[index1] === undefined) {
      return 1;
    }
    if (this.queue[index2] === undefined) {
      return -1;
    }

    return this.compareFn(this.queue[index1], this.queue[index2]);
  }
}

const topKFrequent = function (nums, k) {
  const map = new Map();

  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  // 创建小顶堆
  const heap = new Heap((a, b) => a[1] - b[1]);

  // entry是一个长度为2的数组，0位置存储key,1位置存储value
  for (const entry of map.entries()) {
    heap.push(entry);
    if (heap.size() > k) {
      heap.pop();
    }
  }

  const res = [];

  for (let i = heap.size() - 1; i >= 0; i--) {
    res[i] = heap.pop()[0];
  }

  return res;
};

const nums = [1, 1, 1, 2, 2, 3],
  k = 2;

const result = topKFrequent(nums, k);
console.log(result);
