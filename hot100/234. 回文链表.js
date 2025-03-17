/** 方法一： 将链表转换为数组 ,然后使用双指针判断是否为回文 */
var isPalindrome = function(head) {
    const arr = [];

    let current = head;
    while(current){
        arr.push(current.val);
        current = current.next;
    }

    let left = 0;
    let right = arr.length - 1;
    while(left < right){
        if(arr[left] !== arr[right]){
            return false;
        }
        left++;
        right--;
    }
    return true;
}

/** 方法二： 快慢指针 + 反转链表 */
var isPalindrome = function(head) {
    if(head === null || head.next === null){
        return true;
    }

    // 1.找到中间节点
    let slow = head;
    let fast = head;
    while(fast.next !== null && fast.next.next !== null){
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // 2.反转后半部分
    let secondHalf = reverseList(slow.next);

    // 3.判断是否为回文
    let p1 = head;
    let p2 = secondHalf;
    let result = true;
    while(p2 !== null){
        if(p1.val !== p2.val){
            result = false;
        }
        p1 = p1.next;
        p2 = p2.next;
    }

    // 4.恢复链表
    
    return result;
}

// 反转链表
var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while(curr !== null){
        let next = curr.next;
        curr.next = prev;
        // 1->2->3->null
        // 1-> null  2->3->null
        prev = curr; // = 1
        curr = next; // = 2
    }
    return prev;
}

