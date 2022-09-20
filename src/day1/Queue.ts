import ts from "typescript";

export default class Queue<T> {
    public length: number;
    private head: ListNode<T> | undefined;
    private tail: ListNode<T> | undefined;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    enqueue(item: T): void {
        this.length++;
        const node = {value : item} as ListNode<T>;
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    deque(): T | undefined {
        if(!this.tail){
            return;
        }
        
        this.length--;
        const out = this.tail.value;
        if (!this.tail.prev){
            this.head = this.tail = undefined;
            return out;
        }

        this.tail = this.tail.prev;
        this.tail.next = undefined;
        return out;
    }

    peek(): T | undefined {
        return this.tail?.value;
    }
}