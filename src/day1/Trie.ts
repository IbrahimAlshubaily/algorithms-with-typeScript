export default class Trie {
    
    private root: TrieNode;
    
    constructor() {
        this.root = new TrieNode();
    }

    insert(item: string): void {
        this.root.insert(item, 0);
    }

    delete(item: string): void {
        this.root.findNode(item, 0)?.delete();
    }

    find(partial: string): string[] {
        const result: string[] = [];
        this.root.findNode(partial, 0)?.walk(partial, 0, result);
        return result;
    }
}

class TrieNode {
    
    isWord: boolean;
    children: Map<string, TrieNode>;
    
    constructor(){
        this.isWord = false;
        this.children = new Map<string, TrieNode>();
    }

    insert(item: string, idx: number): void {
        if (idx === item.length) {
            this.isWord = true;
            return;
        }
        
        const currChar = item.charAt(idx);
        if (!this.children.has(currChar)){
            this.children.set(currChar, new TrieNode());
        }
        this.children.get(currChar)?.insert(item, idx+1);
    }

    delete() {
        this.isWord = false;
    }

    findNode(item: string, idx: number): TrieNode | undefined{
        if (idx === item.length) {
            return this;
        }
        const currChar = item.charAt(idx);
        const nextNode = this.children.get(currChar);
        if (nextNode){
            return nextNode.findNode(item, idx+1);
        }
        return undefined;
    }

    walk(partial: string, idx: number, words: string[]): void{
        if (this.isWord){
            words.push(partial);
        }

        this.children.forEach((value, key) => {
                value.walk(partial+key, idx+1, words);
        });
    }
};