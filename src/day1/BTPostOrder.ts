export default function post_order_search(head: BinaryNode<number>): number[] {
    const order : number[] = [];
    walk(head, order);
    return order;
}

function walk(curr: BinaryNode<number> | null, order: number[]): void {
    if (!curr) {
        return;
    }
    walk(curr.left, order);
    walk(curr.right, order);
    order.push(curr.value);
}