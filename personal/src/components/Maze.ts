/**
 * Maze code from this: https://github.com/conorbailey90/Javascript-DFS-Maze/blob/master/maze.js
 */

export default class Maze {
    grid: Cell[][];
    rows: number;
    columns: number;
    current: Cell;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    size: number;
    stack: Cell[];
    setEnd: React.Dispatch<React.SetStateAction<boolean>>;

    constructor(size: number, rows: number, columns: number, setEnd: React.Dispatch<React.SetStateAction<boolean>>) {
        this.canvas = document.querySelector(".maze")!;
        this.context = this.canvas.getContext("2d")!;

        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        this.stack = [];
        this.size = size;
        this.current = new Cell(-1, -1, this.context, this.size, this.grid);
        this.setEnd = setEnd;
    }

    setup(): void {
        for (let row = 0; row < this.rows; row++) {
            let r: Cell[] = [];
            for (let col = 0; col < this.columns; col++) {
                let cell = new Cell(row, col, this.context, this.size, this.grid);
                r.push(cell);
            }
            this.grid.push(r);
        }

        this.current = this.grid[0][0];
        this.grid[this.rows - 1][this.columns - 1].goal = true;
    }

    draw(): void {
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.canvas.style.background = "#181818";
        this.current.visited = true;
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                this.grid[row][col].show(this.size, this.rows, this.columns);
            }
        }

        let next = this.current.checkNeighbours();
        if (next) {
            next.visited = true;
            this.stack.push(this.current);
            this.current.highlight(this.columns, "#FF4D91");
            this.current.removeWalls(this.current, next);
            this.current = next;
        } else if (this.stack.length > 0) {
            let cell = this.stack.pop();
            this.current = cell!;
            this.current.highlight(this.columns, "#FF4D91");
        }
        if (this.stack.length === 0) {
            this.setEnd(true);
            this.current.highlight(this.columns, "#181818");
            return;
        }

        window.requestAnimationFrame(() => {
            this.draw();
        });
    }
}

interface Walls {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
}

class Cell {
    row: number;
    column: number;
    walls: Walls;
    goal: boolean;
    context: CanvasRenderingContext2D;
    visited: boolean;
    parentSize: number;
    parentGrid: Cell[][];

    constructor(row: number, column: number, context: CanvasRenderingContext2D, size: number, grid: Cell[][]) {
        this.row = row;
        this.column = column;
        this.walls = { top: true, bottom: true, left: true, right: true}
        this.goal = false;
        this.context = context;
        this.visited = false;
        this.parentSize = size;
        this.parentGrid = grid;
    }

    highlight(columns: number, color: string): void {
        // Additions and subtractions added so the highlighted cell does cover the walls
        let x = (this.column * this.parentSize) / columns + 1;
        let y = (this.row * this.parentSize) / columns + 1;
        this.context.fillStyle = color;
        this.context.fillRect(
            x,
            y,
            this.parentSize / columns - 3,
            this.parentSize / columns - 3
        );
    }

    removeWalls(cell1: Cell, cell2: Cell): void {
        // compares to two cells on x axis
        let x = cell1.column - cell2.column;
        // Removes the relevant walls if there is a different on x axis
        if (x === 1) {
            cell1.walls.left = false;
            cell2.walls.right = false;
        } else if (x === -1) {
            cell1.walls.right = false;
            cell2.walls.left = false;
        }
        // compares to two cells on x axis
        let y = cell1.row - cell2.row;
        // Removes the relevant walls if there is a different on x axis
        if (y === 1) {
            cell1.walls.top = false;
            cell2.walls.bottom = false;
        } else if (y === -1) {
            cell1.walls.bottom = false;
            cell2.walls.top = false;
        }
    }

    checkNeighbours(): Cell | undefined {
        let grid = this.parentGrid;
        let row = this.row;
        let col = this.column;
        let neighbours = [];

        let top = row !== 0 ? grid[row - 1][col] : undefined;
        let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
        let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
        let left = col !== 0 ? grid[row][col - 1] : undefined;

        if (top && !top.visited) neighbours.push(top);
        if (right && !right.visited) neighbours.push(right);
        if (bottom && !bottom.visited) neighbours.push(bottom);
        if (left && !left.visited) neighbours.push(left);

        if (neighbours.length !== 0) {
            let random = Math.floor(Math.random() * neighbours.length);
            return neighbours[random];
        } else {
            return undefined;
        }
    }

    drawTopWall(x: number, y: number, size: number, columns: number): void {
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(x + size / columns, y);
        this.context.stroke();
    }

    drawRightWall(x: number, y: number, size: number, columns: number, rows: number): void {
        this.context.beginPath();
        this.context.moveTo(x + size / columns, y);
        this.context.lineTo(x + size / columns, y + size / rows);
        this.context.stroke();
    }

    drawBottomWall(x: number, y: number, size: number, columns: number, rows: number): void {
        this.context.beginPath();
        this.context.moveTo(x, y + size / rows);
        this.context.lineTo(x + size / columns, y + size / rows);
        this.context.stroke();
    }

    drawLeftWall(x: number, y: number, size: number, rows: number): void {
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(x, y + size / rows);
        this.context.stroke();
    }

    show(size: number, rows: number, columns: number): void {
        let x = (this.column * size) / columns;
        let y = (this.row * size) / rows;

        this.context.strokeStyle = "#fff";
        this.context.fillStyle = "#181818";
        this.context.lineWidth = 2;

        if (this.walls.top) this.drawTopWall(x, y, size, columns);
        if (this.walls.right) this.drawRightWall(x, y, size, columns, rows);
        if (this.walls.bottom) this.drawBottomWall(x, y, size, columns, rows);
        if (this.walls.left) this.drawLeftWall(x, y, size, columns);
        if (this.visited) {
            this.context.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
        }
    }
}