var canJump = function (nums) {
    if (nums.length === 1) {
        return true;
    }

    let cover = 0;
    for (let i = 0; i <= cover; i++) {
        /** [2,3,1,1,4] 跳出第一步之后到序号1，能跳3步，可直接跳出 */
        // 1+3 = 4
        cover = Math.max(cover, i + nums[i]);
        if (cover >= nums.length - 1) {
            return true;
        }
    }
    return false;
}