export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const path : Point[] = [];
    const seen: boolean[][] = [];
    for (let i = 0; i < maze.length; i++){
        seen.push(Array(maze[0].length).fill(false));
    }
    walk(maze, wall, start, end, seen, path)
    return path;
}

const dir = [
    {x: 0, y: 1} as Point,
    {x: 1, y: 0} as Point,
    {x: -1, y: 0} as Point,
    {x: 0, y: -1} as Point,
]

function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
    if(curr.y < 0 || curr.y >= maze.length || curr.x < 0 || curr.x >= maze[curr.y].length) {
        return false;
    }

    if (seen[curr.y][curr.x] || maze[curr.y][curr.x] === wall){
        return false;
    }

    seen[curr.y][curr.x] = true;
    path.push(curr);
    
    if (curr.x === end.x && curr.y === end.y){
        return true;
    }
    
    for (let i = 0; i < dir.length; i++){
        const next = {x: curr.x + dir[i].x, y: curr.y + dir[i].y} as Point;
        if (walk(maze, wall, next, end, seen, path)) {
            return true;
        }
    }
    path.pop();
    return false;
}

