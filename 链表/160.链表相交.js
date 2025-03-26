/** 哈希表 
 * 时间复杂度：O(m+n)
 * 空间复杂度：O(m)或O(n)
*/
var getIntersectionNode = function (headA, headB) {
  const visited = new Set();
  let curent = headA;
  while (curent) {
    visited.add(curent);
    curent = curent.next;
  }

  curent = headB;
  while (curent) {
    if (visited.has(curent)) {
      return curent; // 找到相交点
    }
    curent = curent.next;
  }

  return null; // 未找到相交点
}

/** 
 * 双指针
 */
// 数学原理：
// 指针pA走过的路径：链表A + 链表B = a + b
// 指针pB走过的路径：链表B + 链表A = b + a
// 当两个指针相遇时，pA和pB走过的总路径长度相等

var getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) return null;
  
  let pA = headA, pB = headB;

  // 当pA和pB相等时退出循环
  // 如果没有相交点，pA和pB会同时为null
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return pA 
}