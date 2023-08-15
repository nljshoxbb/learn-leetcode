/** g 小孩胃口 ，s 饼干 */
var findContentChildren = function (g, s) {
    g = g.sort((a, b) => a - b);
    s = s.sort((a, b) => a - b);
    let result = 0;
    let index = s.length - 1;
    for (let i = g.length - 1; i >= 0; i--) {
        /** 满足胃口条件，优先大饼干满足大胃口 */
        if (index >= 0 && s[index] >= g[i]) {
            result++;
            index--;
        }
    }
    return result;
}