export default class DoublyLinkedList<T> {
    public length: number;
    private head: ListNode<T> | undefined;
    private tail: ListNode<T> | undefined;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        this.length++;
        const node = {value : item} as ListNode<T>;
        if (!this.head) {
            this.head = this.tail = node;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        
        if (idx > this.length) {
            return;
        }
        
        if (idx === 0){
            this.prepend(item);
            return;
        }
        
        if (idx === this.length) {
            this.append(item);
            return;
        }
        this.length++;
        let curr = this.head as ListNode<T>;
        while (curr.next && --idx > 0){
            curr = curr.next;
        }

        const node = {value : item} as ListNode<T>;
        node.next = curr.next;
        node.prev = curr;
        if (curr.next){
            curr.next.prev = node;
        }
        curr.next = node;
    }

    append(item: T): void {
        if (!this.tail){
            this.prepend(item);
            return;
        }
        this.length++;
        const node = {value : item} as ListNode<T>;
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    remove(item: T | undefined): T | undefined {
        return this.removeNode(this.getNodeByValue(item));
    }

    removeAt(idx: number): T | undefined {
        return this.removeNode(this.getNodeByIdx(idx));
    }

    get(idx: number): T | undefined {
        return this.getNodeByIdx(idx)?.value;
    }

    private getNodeByIdx(idx: number): ListNode<T> | undefined {
        if (idx >= this.length || !this.head) {
            return;
        }
        let curr = this.head;
        for (let i = 0; i < idx && curr.next; i++) {
            curr = curr.next;
        }
        return curr;
    }


    private getNodeByValue(item: T | undefined): ListNode<T> | undefined {
        let curr = this.head;
        while(curr) {
            if (curr.value === item) {
                return curr;
            }
            curr = curr.next;
        }
        return;
    }

    removeNode(node : ListNode<T> | undefined) :T | undefined {
        if (!node || !this.head || !this.tail) {
            return;
        }
        
        this.length--;
        if (this.length === 0){
            const out = this.head.value;
            this.head = this.tail = undefined;
            return out;
        }

        if (node === this.head && this.head.next){
            const out = this.head.value;
            this.head = this.head.next;
            this.head.prev  = undefined;
            return out;
        }

        if (node === this.tail && this.tail.prev){
            const out = this.tail.value;
            this.tail = this.tail.prev;
            this.tail.next = undefined;
            return out;
        }
        if (node.next){
            node.next.prev = node.prev;
        }
        if (node.prev){
            node.prev.next = node.next;
        }
        node.prev = node.next = undefined;
        return node.value;
    }
}