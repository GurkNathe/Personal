import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Maze from "./Maze";

import "../css/404.css";

export default function Error404() {
    const [done, setDone] = useState<boolean>(false)
    const [hover, setHover] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        let size = window.innerHeight < window.innerWidth ? 
            window.innerHeight : window.innerWidth;
        let maze = new Maze(size - 65, 20, 20, setDone);
        maze.setup();
        maze.draw()
    }, [])

    return (
        <div className="missing">
            <span 
                className="text" 
                style={
                    done ? {
                        opacity: hover ? "0.5" : "1",
                        transition: hover ? "opacity 0.25s ease-in-out" : "none",
                        animationIterationCount: "1",
                        cursor: "pointer"
                    } : {}
                }
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => done ? navigate(-1) : null}
            >
                {
                    done ? 
                    "Couldn't find the page." : 
                    "Trying to find page..."
                }
            </span>
            <canvas className="maze"/>
        </div>
    );
}