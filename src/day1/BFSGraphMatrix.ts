import Queue from "./Queue";

export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
    
    const seen : boolean[] = Array(graph.length).fill(false);
    const prev : number[] = Array(graph.length).fill(-1);

    const q = new Queue<number>();
    q.enqueue(source);
    while (q.length > 0) {
        
        const curr = q.deque() as number;
        seen[curr] = true;

        if (curr === needle) {
            break;
        }
        
        const adj = graph[curr];
        for (let i = 0; i < adj.length; i++){
            if (adj[i] !== 0 && !seen[i]) {
                prev[i] = curr;
                q.enqueue(i);
            }
        }
    }

    if (!seen[needle]) {
        return null;
    }

    const path : number[] = [needle];
    let curr = needle;
    while(curr !== source){
        curr = prev[curr];
        path.push(curr);
    }
    return path.reverse();
}