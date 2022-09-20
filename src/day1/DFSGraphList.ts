
export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
    const seen : boolean[] = Array(graph.length).fill(false);
    const path : number[] = [];
    seen[source] = true;
    walk(graph, source, needle, seen, path)
    if (path.length === 0) {
        return null;
    }
    return path;
}

function walk(graph: WeightedAdjacencyList, curr: number, needle: number, seen : boolean[], path : number[]): boolean {
    
    path.push(curr);
    if (curr === needle) {
        return true;
    }

    const adj = graph[curr];
    for (let i = 0; i < adj.length; i++) {

        if (!seen[adj[i].to]){

            seen[adj[i].to] = true;
            if (walk(graph, adj[i].to, needle, seen, path)){
                return true;
            }
        }
    }

    path.pop();
    return false;
}