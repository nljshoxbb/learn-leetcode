/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  const len = s.length;
  let resArr = s.split("");

  for (let i = 0; i < len; i += 2 * k) {
    // 每隔 2k 个字符的前 k 个字符进行反转
    let left = i - 1;
    let right = i + k > len ? len : i + k;
    while (++left < --right) {
      [resArr[left], resArr[right]] = [resArr[right], resArr[left]];
    }
  }
  return resArr.join("");
};
