/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let dummy = new ListNode(0, head);
  let slow = (fast = dummy);
  // 先让快指针移动到n的距离
  while (n--) {
    fast = fast.next;
  }
  // 快慢指针同时移动
  while (fast.next !== null) {
    fast = fast.next;
    slow = slow.next;
  }
  // fast.next === null 说明当前slow指向n节点的前一个节点
  slow.next = slow.next.next;
  return dummy.next;
};
