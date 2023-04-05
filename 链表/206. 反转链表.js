/** 双指针 */
var reverseList = function (head){
    let cur = head;
    let prev = null;

    while(cur){
        const tmp =cur.next;
        cur.next = prev;
        prev = cur;
        cur = tmp;
    }
    return prev;
}

/** 递归 */
let reverseList = function (head){
    let reverse = (cur,prev)=>{
        if(!cur) return prev;
        let tmp = cur.next;
        cur.next = prev;
        return reverse(tmp,cur)
    }
    return reverse(head,null)
}