var removeElement = function(head,target){
    const dummy = new ListNode(0);
    /** 连起来 */
    dummy.next = head;
    /** 保存游标 */
    let cur = dummy; 
    while(cur!== null){
        if(cur.next.val === target){
            cur.next = cur.next.next
        }else{
            cur = cur.next
        }
    }
    return dummy.next;
}