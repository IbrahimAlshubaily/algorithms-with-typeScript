export default function compare(a: BinaryNode<number> | null, b: BinaryNode<number> | null): boolean {
    if (a != b) {
        return false;
    }
    if (!a || !b) {
        return true;
    }
    return compare(a.left, b.left) && compare(a.right, b.right);
}