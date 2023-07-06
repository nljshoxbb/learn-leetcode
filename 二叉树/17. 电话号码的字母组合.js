// digits 输入的号码组合 ；例如输入 23
var letterCombinations = function (digits) {
    const k = digits.length;
    const map = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    if (!k) {
        return [];
    }
    if(k === 1){
        return map[digits].split("");
    }


    const res = [],path = [];

    function backtracking(digitsData,digitsLen,idx){
        if(path.length === digitsLen){
            res.push(path.join(""));
            return;
        }

        for(const v of map[digitsData[idx]]){
            path.push(v);
            backtracking(digitsData,digitsLen,idx+1);
            path.pop;
        }
    }

    backtracking(digits,k,0);

    return res;

}