const isValid = function (s) {
  const n = s.length;
  if (n % 2 === 1) {
    return false;
  }

  const pairs = new Map([
    [")", "("],
    ["}", "{"],
    ["]", "["],
  ]);

  const stack = [];

  for (let ch of s) {
    if (pairs.has(ch)) {
      // 第三种情况：遍历字符串匹配过程中，栈已经为空了，没有匹配字符，说明右括号没有找到对应的左括号
      // 第二种情况：遍历字符串匹配过程中，发现栈里没有要匹配的字符，return false
      if (stack.length === 0 || stack[stack.length - 1] !== pairs.has(ch)) {
        return false;
      }
      stack.pop();
    } else {
      stack.push(ch);
    }
  }
  // 第一种情况： 已经遍历完字符串，但是栈不为空，说明有相应的左括号没有右括号来匹配
  return stack.length === 0;
};

const isValid1 = (s) => {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    let c = s[i];

    switch (c) {
      case "(":
        stack.push(")");
        break;
      case "{":
        stack.push("}");
        break;
      case "[":
        stack.push("]");
        break;
      default:
        if (c !== stack.pop()) {
          return false;
        }
        break;
    }
  }
  return stack.length === 0;
};
