class TrieNode {
    constructor(){
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor(){
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isEndOfWord = true;
    }

    search(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children.has(char)){
                return false;
            }
            node = node.children.get(char);
        }
        return node.isEndOfWord;
    }

    startsWith(prefix){
        let node = this.root;
        for (let char of prefix) {
            if (!node.children.has(char)){
                return false;
            }
            node = node.children.get(char);
        }
        return true;
    }

    getWordsWithPrefix(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children.has(char)) {
                return [];
            }
            node = node.children.get(char);
        }
        return this._findAllWords(node, prefix);
    }

    _findAllWords(node, prefix) {
        let words = [];
        if (node.isEndOfWord) {
            words.push(prefix);
        }
        for (let [char, childNode] of node.children.entries()) {
            words.push(...this._findAllWords(childNode, prefix + char));
        }
        return words;
    }
}

// Example usage:
const trie = new Trie();
trie.insert("apple");
trie.insert("app");
trie.insert("apricot");
trie.insert("banana");
trie.insert("band");
trie.insert("bandana");
trie.insert("bat");
trie.insert("batman");
trie.insert("batwoman");

console.log(trie.search("apple")); // true
console.log(trie.search("app")); // true
console.log(trie.startsWith("ap"));// 