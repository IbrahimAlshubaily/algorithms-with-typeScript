import ArrayList from "./ArrayList";

declare type MapListNode<K, V> = {
    key: K,
    value: V,
    next?: MapListNode<K,V>,
}
export default class Map<T extends (string | number), V> {
    
    private length: number;
    private data: ArrayList<MapListNode<T,V>>;

    constructor() {
        this.length = 0;
        const capacity = 1024;
        this.data = new ArrayList(capacity);
    }

    get(key: T): V | undefined {
        return this.getNode(key)?.value;
    }

    
    set(key: T, value: V): void {

        const node = this.getNode(key);
        if (node) {
            node.value = value;
            return;
        }
        this.length++;
        const idx = this.getIdx(key);
        if (this.data.get(idx) === undefined) {
            const bucket_head = {key: key, value: value} as MapListNode<T,V>
            this.data.insertAt(bucket_head, idx);
            return;
        }
        let head = this.data.get(idx);
        let new_bucket_head = {key: key, value: value, next: head} as MapListNode<T,V>;
        this.data.update(idx, new_bucket_head);
    }

    delete(key: T): V | undefined {
        
        let idx = this.getIdx(key);
        let curr = this.data.get(idx);
        
        if (!curr) {
            return;
        }
        
        this.length--;
        if (curr.key === key) {
            const out = curr.value;
            this.data.update(idx, curr.next);
            return out;
        }
        
        while(curr.next && curr.next?.key !== key) {
            curr = curr.next;
        }
        
        if (curr.next?.key === key) {
            const out = curr.next.value;
            curr.next = curr.next.next;
            return out;
        }
        return;
        
    }

    size(): number {
        return this.length;
    }
    
    private getNode(key: T): MapListNode<T, V> | undefined {
        let bucketIdx = this.getIdx(key);
        let curr = this.data.get(bucketIdx);
        while(curr && curr.key !== key && curr.next) {
            curr = curr.next;
        }
        if (curr && curr.key === key) {
            return curr;
        }
        return;
    }
    
    private getIdx(key: T): number {
        return this.hash(key) % this.data.length;
    }
    
    private hash(Key: T): number {
        let hashCode = 42;
        const keyStr =  Key.toString();
        for (let i = 0; i < keyStr.length; i++) {
            hashCode += hashCode * keyStr.charCodeAt(i);
        }
        return hashCode;
    }
    
}

