import { useEffect, useRef, useState } from "react";

import "../css/404.css";

export default function Error404() {
    const [maze, setMaze] = useState<Maze>({
        grid: [
            ['start', 'path', 'path'],
            ['wall', 'wall', 'path'],
            ['end', 'path', 'path'],
        ],
        start: { x: 0, y: 0 },
        end: { x: 0, y: 2 },
    })

    const tableRef = useRef<HTMLTableElement | null>(null);

    interface Maze {
        grid: string[][];
        start: { x: number; y: number };
        end: { x: number; y: number };
    }

    interface Player {
        x: number;
        y: number;
    }

    const renderMaze = (maze: Maze) => {
        const mazeContainer = document.createElement("table") as HTMLTableElement;
        mazeContainer.className = "maze";
        for (const row of maze.grid) {
            const tableRow = document.createElement("tr") as HTMLTableRowElement;
            for (const cell of row) {
                const tableCell = document.createElement("td") as HTMLTableCellElement;
                tableCell.classList.add(cell);
                tableRow.appendChild(tableCell);
            }
            mazeContainer.appendChild(tableRow);
        }
        return mazeContainer;
    }
    
    useEffect(() => {
        if (
            tableRef.current !== null && !(
                Array
                    .from(tableRef.current!.children)
                    .find((element) => element.tagName.toLowerCase() === "table")
            )
        ) {
            const mazeContainer = renderMaze(maze);
            tableRef.current.appendChild(mazeContainer);
        }
    }, [])

    return (
        <div className="missing" ref={tableRef}/>
    );
}