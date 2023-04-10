import { useEffect, useState } from "react";

import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styled from "@mui/material/styles/styled";
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

const PageSizeSelect = styled(Select)({
    '.MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
    }
});

const SearchField = styled(TextField)({
    "& label.Mui-focused": {
        color: "black"
    },
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "black"
        }
    }
});

const SelectForm = styled(FormControl)({
    "& label.Mui-focused": {
        color: "black"
    },
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "black"
        }
    }
});

export default function BlogList() {
    const [posts, setPosts] = useState<BlogItem[]>([]);
    const [page, setPage] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>("");
    const [pageSize, setPageSize] = useState<number>(5);

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

    const changePageSize = (event: SelectChangeEvent<unknown>) => {
        let pS: number = Number(event.target.value);
        setPosts(data.slice(0, pS));
        setPageSize(pS);
        if (page > 0) {
            setPage(0);
        }
    };

    return (
        <div className="list">
            <StyledEngineProvider injectFirst>
                <SearchField
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
            {pageSize < data.length ?
                <Pagination
                    className="pages"
                    page={page + 1}
                    count={Math.ceil(data.length / pageSize)}
                    onChange={(_, value) => onPageChange(value - 1)}
                /> :
                <div style={{ padding: "10px" }}></div>
            }
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
            <SelectForm className="page-size" size="small">
                <InputLabel>Page Size</InputLabel>
                <PageSizeSelect
                    value={String(pageSize)}
                    label="Age"
                    onChange={(event) => changePageSize(event)}
                >
                    <MenuItem value={5}>Five</MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={15}>Fifteen</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </PageSizeSelect>
            </SelectForm>
            {pageSize < data.length ?
                <Pagination
                    className="pages"
                    page={page + 1}
                    count={Math.ceil(data.length / pageSize)}
                    onChange={(_, value) => onPageChange(value - 1)}
                /> :
                <div style={{ padding: "10px" }}></div>
            }
        </div>
    );
}