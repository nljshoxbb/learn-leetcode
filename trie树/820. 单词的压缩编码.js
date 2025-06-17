class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

/*
【字典树】——— 之所以想到使用字典树，是因为该题完全发挥了字符串的后缀特征

我们构造出这样的一个[逆序]字典树，很容易发现： "编码"后的字符串长度，就是忽略了后缀单词后，所有单词的(长度+1)之和
这不难理解，比如"abcd#","bcd","cd","d"这种后缀单词就默认被包括了，因而算整个字符串的长度时，算"abcd"这个最长的就行了

核心思路是：每次往字典树插入一个"新的word"时，就 += 该word的长度 + 1(#)
需要注意的是，不是每一次插入单词，都需要加上该单词的长度
而是先根据长度对words进行一次排序，先插入长的，再插入短的。如果插入时需要new出新节点，我们就认为这是一个"新word"

举几个例子：
    1. 先插"cba"，再插"dba" ———— 虽然后缀有重合，但是依旧需要new出新节点，认为是"新word",最终字符串只能为"cba#dba#"
    2. 先插"ba"，再插"dcba" ———— 两次插入都有new出新节点的行为，因此算多了，3+1 + 5+1 =8，实际为"dcba#"，为5
    3. 先插"dcba"，再插"ba" ———— 因为先插长的，第二次插入并没有出现new的行为，4+1 = 5，正确 ! ! !
    */
class Trie {
    constructor() {
        this.root = new TrieNode()
    }

    insert(word) {
        let node = this.root;
        let isNewWord = false;

        // 反向插入单词
        for (let i = word.length - 1; i >= 0; i--) {
            const char = word[i];
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
                isNewWord = true;
            }
            node = node.children.get(char);
        }
        node.isEndOfWord = true;

        // 如果是新单词，返回单词长度 + 1（#号）
        return isNewWord ? word.length + 1 : 0;
    }
}

function minimumLengthEncoding(words) {
    // 去重并按长度排序
    words = Array.from(new Set(words)).sort((a, b) => b.length - a.length);

    const trie = new Trie();
    let totalLength = 0;

    // 反向插入单词
    for (const word of words) {
        totalLength += trie.insert(word);
    }

    // 返回总长度
    return totalLength;
}

// 示例用法
const words = ["time", "me", "bell"];
console.log(minimumLengthEncoding(words)); // 输出: 10
