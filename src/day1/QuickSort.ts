export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}

function qs(arr : number[], lo : number, hi : number): void {
    if (hi - lo < 2) return;
    const pivot = partition(arr, lo, hi);
    qs(arr, lo, pivot);
    qs(arr, pivot+1, hi);
}

function partition(arr: number[], lo : number, hi : number) : number {
    const pivot = arr[Math.floor(lo + (hi - lo) / 2)];
    while( lo < hi) {
        while(arr[lo] < pivot) lo++;
        while(arr[hi] > pivot) hi--;
        if (lo < hi) {
            [arr[lo], arr[hi]] = [arr[hi], arr[lo]];

        }
        lo++;
        hi--;
    }
    return lo;
}