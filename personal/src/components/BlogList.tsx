import { Suspense, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { SelectChangeEvent } from "@mui/material/Select";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

import BlogPost, { LoadedArticle } from "./BlogPost";

import { 
    CustomProgress ,
    PageSizeSelect, 
    SearchField, 
    SelectForm 
} from "./CustomComponent";

import "../css/blog-list.css";

//TODO: Functioning search bar

export const articleLoader = async () => {
    const res = await fetch("https://raw.githubusercontent.com/GurkNathe/Personal/main/articles/articles.json");
    const articles = res.json();
    return articles;
};

export default function BlogList() {
    const data = useLoaderData() as LoadedArticle[];

    const [posts, setPosts] = useState<LoadedArticle[]>([]);
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
            <Suspense 
                fallback={
                    <div style={{display:"flex"}}>
                        <CustomProgress/>
                    </div>
                }
            >
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
            </Suspense>
        </div>
    );
}