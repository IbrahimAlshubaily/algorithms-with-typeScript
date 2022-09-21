export default class MinHeap {

    public length: number;
    private data : number[];
    private capacity : number;

    constructor() {
        this.length = 0;
        this.capacity = 32;
        this.data = Array(this.capacity);
    }
    
    insert(value: number): void {
        this.insureCapacity();
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }

    delete(): number | undefined {
        if (this.length === 0) {
            return;
        }

        this.length--;
        const out = this.data[0];
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;
    }

    private heapifyUp(idx : number): void {
        const parentIdx = this.parent(idx);
        if (idx === 0 || this.data[idx] >= this.data[parentIdx]) {
            return;
        }
        this.swap(idx, parentIdx);
        this.heapifyUp(parentIdx);
    }

    private heapifyDown(idx : number): void {
        const leftIdx = this.left(idx);
        if (leftIdx >= this.length){
            return;
        }
        
        const rightIdx = this.right(idx);
        if (this.data[idx] <= Math.min(this.data[rightIdx] , this.data[leftIdx])){
            return;
        }

        let nextChild = leftIdx;
        if (this.data[rightIdx] < this.data[leftIdx]) {
            nextChild = rightIdx;
        }
        this.swap(idx, nextChild);
        this.heapifyDown(nextChild);
    }

    private left(idx: number): number {
        return idx * 2 + 1;
    }

    private right(idx: number): number {
        return idx * 2 + 2;
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2)
    }

    private swap(i: number, j: number): void {
        const tmp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = tmp;
    }

    private insureCapacity() {
        if (this.length < this.capacity) {
            return;
        }
        this.data.concat(Array(this.capacity));
        this.capacity *= 2;
    }

}