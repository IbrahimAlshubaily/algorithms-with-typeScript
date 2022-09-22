export default class LRU<K, V> {
    
    private length: number;
    
    private capacity: number;
    private cache: Map<K, MapListNode<K, V>>;
    private head: MapListNode<K, V> | undefined;
    private tail: MapListNode<K, V> | undefined;

    constructor(capacity: number) {
        
        this.length = 0;
        this.capacity = capacity;
        this.head = this.tail = undefined;
        
        this.cache = new Map<K, MapListNode<K, V>>();
    }

    update(key: K, value: V): void {
        let node = this.cache.get(key);
        if (!node) {
            if (this.length === this.capacity) {
                this.cache.delete(this.tail?.key as K);
                this.detach(this.tail);
                this.length--;
            }
            this.length++;
            node = {key: key, value: value} as MapListNode<K, V>;
            this.cache.set(key, node);
        }
        this.detach(node);
        this.prepend(node);
    }

    get(key: K): V | undefined {
        const node = this.cache.get(key);
        if (node) {
            this.update(key, node.value);
            return node.value;
        }
        return;

    }

    private detach(node: MapListNode<K, V> | undefined): void {
        
        if (!node || node.next === node.prev && node.prev == undefined){
            return;
        }

        if (this.head?.key === this.tail?.key){
            this.head = this.tail = undefined;
            return;
        }

        if (node.prev){
            node.prev.next = node.next;
        }
        if(node.next){
            node.next.prev = node.prev;
        }

        if (node.key === this.head?.key && this.head.next){
            this.head = this.head.next;
        }

        if (node.key === this.tail?.key && this.tail.prev){
            this.tail = this.tail.prev;
        }
        node.next = node.prev = undefined;
    }

    private prepend(node: MapListNode<K, V>): void {
        
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        
        if (node.key === this.head.key){
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

}