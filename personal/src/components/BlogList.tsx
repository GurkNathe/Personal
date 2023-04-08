import { useEffect, useState } from "react";

import InputAdornment from "@mui/material/InputAdornment";
import Pagination from "@mui/material/Pagination";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import TextField from "@mui/material/TextField";

import BlogPost, { BlogItem } from "./BlogPost";

import "../css/blog-list.css";

//TODO: Functioning search bar
//TODO: Fetch data

// Testing data
const data = [
    {
        title: "A* pathfinding algorithm",
        thumbnailUrl: "https://github.com/GurkNathe/Pathfinding-Algorithms/blob/main/resources/Best-First-Search.gif?raw=true",
        summary: `Discusses the A\* pathfinding algorithm when applied to a grid-base graph. It then compares the performance of the A\* algorithm with other popular pathfinding algorithms, then details the benefits and compromises made for the algorithms.`,
        contentUrl: "/",
        tags: ["Algorithms", "A*", "Graph Search", "Pathfinding", "Best-First-Search"],
        timestamp: new Date(),
    },
    {
        title: "A* pathfinding algorithm",
        thumbnailUrl: "https://github.com/GurkNathe/Pathfinding-Algorithms/blob/main/resources/astar_maze.gif?raw=true",
        summary: `Discusses the A\* pathfinding algorithm when applied to a grid-base graph. It then compares the performance of the A\* algorithm with other popular pathfinding algorithms, then details the benefits and compromises made for the algorithms.`,
        contentUrl: "/",
        tags: ["Algorithms", "A*", "Graph Search", "Pathfinding", "Best-First-Search"],
        timestamp: new Date(),
    },
    {
        title: "A* pathfinding algorithm",
        thumbnailUrl: "https://github.com/GurkNathe/Pathfinding-Algorithms/blob/main/resources/Best-First-Search.gif?raw=true",
        summary: `Discusses the A\* pathfinding algorithm when applied to a grid-base graph. It then compares the performance of the A\* algorithm with other popular pathfinding algorithms, then details the benefits and compromises made for the algorithms.`,
        contentUrl: "/",
        tags: ["Algorithms", "A*", "Graph Search", "Pathfinding", "Best-First-Search"],
        timestamp: new Date(),
    },
    {
        title: "A* pathfinding algorithm",
        thumbnailUrl: "https://github.com/GurkNathe/Pathfinding-Algorithms/blob/main/resources/astar_maze.gif?raw=true",
        summary: `Discusses the A\* pathfinding algorithm when applied to a grid-base graph. It then compares the performance of the A\* algorithm with other popular pathfinding algorithms, then details the benefits and compromises made for the algorithms.`,
        contentUrl: "/",
        tags: ["Algorithms", "A*", "Graph Search", "Pathfinding", "Best-First-Search"],
        timestamp: new Date(),
    },
    {
        title: "A* pathfinding algorithm",
        thumbnailUrl: "https://github.com/GurkNathe/Pathfinding-Algorithms/blob/main/resources/Best-First-Search.gif?raw=true",
        summary: `Discusses the A\* pathfinding algorithm when applied to a grid-base graph. It then compares the performance of the A\* algorithm with other popular pathfinding algorithms, then details the benefits and compromises made for the algorithms.`,
        contentUrl: "/",
        tags: ["Algorithms", "A*", "Graph Search", "Pathfinding", "Best-First-Search"],
        timestamp: new Date(),
    },
    {
        title: "A* pathfinding algorithm",
        thumbnailUrl: "https://github.com/GurkNathe/Pathfinding-Algorithms/blob/main/resources/astar_maze.gif?raw=true",
        summary: `Discusses the A\* pathfinding algorithm when applied to a grid-base graph. It then compares the performance of the A\* algorithm with other popular pathfinding algorithms, then details the benefits and compromises made for the algorithms.`,
        contentUrl: "/",
        tags: ["Algorithms", "A*", "Graph Search", "Pathfinding", "Best-First-Search"],
        timestamp: new Date(),
    },
    {
        title: "A* pathfinding algorithm",
        thumbnailUrl: "https://github.com/GurkNathe/Pathfinding-Algorithms/blob/main/resources/Best-First-Search.gif?raw=true",
        summary: `Discusses the A\* pathfinding algorithm when applied to a grid-base graph. It then compares the performance of the A\* algorithm with other popular pathfinding algorithms, then details the benefits and compromises made for the algorithms.`,
        contentUrl: "/",
        tags: ["Algorithms", "A*", "Graph Search", "Pathfinding", "Best-First-Search"],
        timestamp: new Date(),
    },
    {
        title: "A* pathfinding algorithm",
        thumbnailUrl: "https://github.com/GurkNathe/Pathfinding-Algorithms/blob/main/resources/astar_maze.gif?raw=true",
        summary: `Discusses the A\* pathfinding algorithm when applied to a grid-base graph. It then compares the performance of the A\* algorithm with other popular pathfinding algorithms, then details the benefits and compromises made for the algorithms.`,
        contentUrl: "/",
        tags: ["Algorithms", "A*", "Graph Search", "Pathfinding", "Best-First-Search"],
        timestamp: new Date(),
    },
];

export default function BlogList() {
    const [posts, setPosts] = useState<BlogItem[]>([]);
    const [page, setPage] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>("");
    const [pageSize, setPageSize] = useState<number>(6);

    useEffect(() => {
        setPosts(data.slice(0, pageSize));
    }, []);

    const onPageChange = (page: number) => {
        setPosts(data.slice(pageSize * page, pageSize + (pageSize * page)));
        setPage(page);
    };

    const onSearch = () => {
        // filter posts by tags, title, summary, and publish date
    };

    return (
        <div className="list">
            <StyledEngineProvider injectFirst>
                <TextField
                    className="search"
                    margin="dense"
                    placeholder="Search..."
                    autoFocus
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            onSearch();
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchRoundedIcon />
                            </InputAdornment>
                        )
                    }}
                />
            </StyledEngineProvider>
            {posts.map((datum, index) => (
                <BlogPost
                    key={index}
                    title={datum.title}
                    thumbnailUrl={datum.thumbnailUrl}
                    summary={datum.summary}
                    contentUrl={datum.contentUrl}
                    tags={datum.tags}
                    timestamp={datum.timestamp}
                />
            ))}
            {pageSize < data.length ?
                <Pagination
                    className="pages"
                    count={Math.ceil(data.length / pageSize)}
                    onChange={(_, value) => onPageChange(value - 1)}
                /> :
                <div style={{ padding: "10px" }}></div>
            }
        </div>
    );
}