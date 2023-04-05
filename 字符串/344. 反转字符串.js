/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  reverse(s);
};

var reverse = function (s) {
  let left = -1;
  let right = s.length;
  /** 两指针同时移动 */
  while (++left < --right) {
    [s[left], s[right]] = [s[right], s[left]];
  }
};
