var replace = function (s) {
  // 字符串转为数组
  const strArr = Array.from(s);
  let count = 0;

  // 计算空格数量
  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i] === " ") {
      count++;
    }
  }

  let left = strArr.length - 1;
  // 原来空格占一个字符 ，替换后'02%'为3个字符，所以总长 3-1 = 2
  let right = strArr.length + count * 2 - 1;

  while (left > 0) {
    if (strArr[left] === " ") {
      strArr[right--] = "0";
      strArr[right--] = "2";
      strArr[right--] = "%";
      left--;
    } else {
      strArr[right--] = strArr[left--];
    }
  }
  return strArr.join("");
};
