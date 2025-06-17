/** 排序 */
const groupAngrams = (strs) => {
  const map = new Map();

  for (let str of strs) {
    let arr = Array.from(str);
    arr.sort();
    let key = arr.toString();
    let list = map.get(key) ? map.get(key) : [];
    list.push(str);
    map.set(key, list);
  }

  return Array.from(map.values());
};

/** 计数 */
const groupAngrams1 = (strs) => {
  const map = {};
  for (let s of strs) {
    const count = new Array(26).fill(0);
    for (let c of s) {
      count[c.charCodeAt() - "a".charCodeAt()]++;
    }
    map[count] ? map[count].push(s) : (map[count] = [s]);
  }
  return Object.values(map);
};
