
export default class ArrayList<T> {
    public length: number;
    private capacity : number;
    private data : (T | undefined) [];
    

    constructor(capacity : number) {
        this.capacity = capacity;
        this.length = 0;
        this.data = Array<T | undefined>(capacity);
    }

    prepend(item: T): void {
        this.insureCapacity();
        this.insertAt(item, 0);
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            return;
        }
        this.insureCapacity();
        this.shiftRight(idx);
        this.data[idx] = item;
        this.length++;
    }

    append(item: T): void {
        this.insureCapacity();
        this.data[this.length] = item;
        this.length++;
    }

    remove(item: T): T | undefined {
        for (let i = 0; i < this.length; i++){
            if (this.data[i] === item){
                return this.removeAt(i);
            }
        }
        return;
    }
    
    removeAt(idx: number): T | undefined {
        if (idx >= this.length) {
            return;
        }
        const out = this.data[idx];
        this.shiftLeft(idx + 1);
        this.length--;
        return out;
    }
    
    get(idx: number): T | undefined {
        if (idx >= this.length) {
            return;
        }
        return this.data[idx];
    }

    update(idx: number, item: T | undefined): T | undefined {
        if (idx >= this.length) {
            return;
        }
        return this.data[idx] = item;
    }

    shiftRight(idx : number) {
        let currIdx = this.length - 1;
        while (currIdx >= idx){
            this.data[currIdx + 1] = this.data[currIdx];
            currIdx--;
        }
    }

    shiftLeft(idx : number) {
        while (idx < this.length){
            this.data[idx - 1] = this.data[idx];
            idx++;
        }
    }

    insureCapacity() {
        if (this.length < this.capacity) {
            return;
        }
        this.data.concat(Array(this.capacity));
        this.capacity *= 2;
    }
}