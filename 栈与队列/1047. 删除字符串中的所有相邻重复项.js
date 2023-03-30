var removeDuplicates = function (s) {
  const stack = [];
  for (const x of s) {
    // 栈顶元素对比，如果相等则取出
    if (stack.length && x === stack[stack.length - 1]) {
      stack.pop();
      continue;
    }
    stack.push(x);
  }
  return stack.join("");
};

// 原地解法（双指针模拟栈）
var removeDuplicates1 = function (s) {
  s = [...s];
  let top = -1; // 指向栈顶元素的下标
  for (let i = 0; i < s.length; i++) {
    if (top === -1 || s[top] !== s[i]) {
      // top === -1 即空栈
      s[++top] = s[i]; // 入栈
    } else {
      top--; // 出栈
    }
  }
  s.length = top + 1; // 栈顶元素下标 + 1 为栈的长度
  return s.join("");
};
