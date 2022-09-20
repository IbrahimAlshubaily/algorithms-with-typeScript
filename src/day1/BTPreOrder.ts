export default function pre_order_search(head: BinaryNode<number>): number[] {
    const order : number[] = [];
    walk(head, order);
    return order;
}

function walk(curr: BinaryNode<number> | null, order: number[]): void {
    if (!curr) {
        return;
    }
    order.push(curr.value);
    walk(curr.left, order);
    walk(curr.right, order);
}