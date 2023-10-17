/** 贪心解法 */
/** 需要解决
 *  1. 上下坡中有平坡
 *  2. 数组首位两端
 *  3. 单调坡中有平坡
 */
var wiggleMaxLength = function (nums) {
    if (nums.length <= 1) {
        return nums.length;
    }
    /** 初始值为1，解决首位两端情况 */
    let result = 1;
    let preDiff = 0;
    let curDiff = 0;

    for (let i = 0; i < nums.length - 1; i++) {
        curDiff = nums[i+1] - nums[i];
        /** preDiff = 0 处理平坡的情况，统一在左侧进行处理 */
        if((curDiff > 0 && preDiff<=0 ) || (curDiff < 0 && preDiff >=0)){
            result ++
            /**
             * 只需要在 这个坡度 摆动变化的时候，更新 prediff 就行，这样 prediff 在 单调区间有平坡的时候 就不会发生变化，造成误判。
             */
            preDiff = curDiff;
        }
    }
    return result;
}