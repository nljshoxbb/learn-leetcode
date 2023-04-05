var swapPairs =function(head){

    let dummy = new ListNode(0,head)
    let temp = dummy;
    //dummy->1->2->3->4->5 ==> dummy->2->1->4->3->5
    while(temp.next && temp.next.next){
        /** 保存节点1 */
        let pre = temp.next;
        /** 保存节点2 */
        let cur = temp.next.next
        /** 节点1指向节点3 */
        pre.next = cur.next;
        /** 节点2指向节点1 */
        cur.next = pre;
        /** 头节点指向节点2 */
        temp.next = cur;
        /** 一次翻转结束 */

        
        /** 游标往前走，继续循环翻转 */
        temp = pre;
    }

    return dummy.next;

}