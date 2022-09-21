export default function two_crystal_balls(breaks: boolean[]): number {

    const lenSqrt = Math.sqrt(breaks.length);

    let curr = lenSqrt;
    while (curr < breaks.length && !breaks[curr]) {
        curr += lenSqrt;
    }

    curr -= lenSqrt;

    for (let i = curr; i <= curr+lenSqrt; i++) {
        if (breaks[i]) {
            return i;
        }
    }

    return -1;
}