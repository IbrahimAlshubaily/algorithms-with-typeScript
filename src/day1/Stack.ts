export default class Stack<T> {
    public length: number;
    private data: T[];
    private capacity: number;

    constructor() {
        this.length = 0;
        this.capacity = 32;
        this.data = Array(this.capacity);
    }

    push(item: T): void {
        this.insureCapacity();
        this.data[this.length] = item;
        this.length++;
    }

    pop(): T | undefined {
        if (this.length === 0) {
            return;
        }
        this.length--;
        return this.data[this.length];
    }

    peek(): T | undefined {
        if (this.length === 0) {
            return;
        }
        return this.data[this.length-1];
    }

    private insureCapacity(): void{
        if(this.length < this.capacity) {
            return;
        }
        this.data.concat(Array(this.capacity));
        this.capacity *= 2;
    }
}