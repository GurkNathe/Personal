import { Suspense, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { SelectChangeEvent } from "@mui/material/Select";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

import { create, insert, search, stemmers } from "@orama/orama";

import BlogPost, { LoadedArticle } from "./BlogPost";

import {
    CustomProgress,
    PageSizeSelect,
    SearchField,
    SelectForm
} from "./CustomComponent";

import "../css/blog-list.css";
import { OpaqueDocumentStore, OpaqueIndex, Orama, Schema } from "@orama/orama/dist/types";

//TODO: Functioning search bar

export const articleLoader = async () => {
    const res = await fetch("https://raw.githubusercontent.com/GurkNathe/Personal/main/articles/articles.json");
    const articles = res.json();
    return articles;
};

const searchMaker = async (data: LoadedArticle[]) => {
    const search = await create({
        schema: {
            title: "string",
            thumbnailUrl: "string",
            summary: "string",
            contentUrl: "string",
            tags: "string",
            timestamp: "string",
        },
        components: {
            tokenizer: {
                stemmer: stemmers.english,
            },
        },
    })

    data.forEach(async (value) => {
        await insert(search, {
            ...value,
            tags: value.tags.join(","),
            timestamp: value.timestamp + " " + (new Date(value.timestamp)).toDateString()
        })
    });

    return search;
};

export default function BlogList() {
    const data = useLoaderData() as LoadedArticle[];
    const [searchDB, setSearch] = useState<Orama<{Schema: Schema; Index: OpaqueIndex; DocumentStore: OpaqueDocumentStore;}>>({} as Orama<{Schema: Schema; Index: OpaqueIndex; DocumentStore: OpaqueDocumentStore;}>);
    const [clayData, setClayData] = useState(data);
    const [posts, setPosts] = useState<LoadedArticle[]>([]);
    const [page, setPage] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>("");
    const [pageSize, setPageSize] = useState<number>(5);

    useEffect(() => {
        searchMaker(data).then((res) => {
            setSearch(res);
        }).catch((err) => {
            console.error(err);
        });
        setPosts(clayData.slice(0, pageSize));
    }, []);

    const onPageChange = (page: number) => {
        setPosts(clayData.slice(pageSize * page, pageSize + (pageSize * page)));
        setPage(page);
    };

    const onSearch = async (query: string) => {
        setSearchValue(query);
        if (query === "") {
            setClayData(data);
            setPosts(data.slice(0, pageSize));
        } else {
            const result = await search(searchDB, {
                term: query,
                properties: ["title", "summary", "tags", "timestamp"],
            })
            console.log(result);
            if (result.count === 0) {
                setClayData([]);
                setPosts([]);
            } else {
                setClayData(data.filter((datum) => {
                    return result.hits.filter((hit) => {
                        return datum.contentUrl === hit.document.contentUrl
                    })
                }));
            }
        }
    };

    const changePageSize = (event: SelectChangeEvent<unknown>) => {
        let pS: number = Number(event.target.value);
        setPosts(clayData.slice(0, pS));
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
                    onChange={(event) => onSearch(event.target.value)}
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
                    <div style={{ display: "flex" }}>
                        <CustomProgress />
                    </div>
                }
            >
                {posts.length > 0 ? 
                    <>
                        {pageSize < clayData.length ?
                            <Pagination
                                className="pages"
                                page={page + 1}
                                count={Math.ceil(clayData.length / pageSize)}
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
                        {pageSize < clayData.length ?
                            <Pagination
                                className="pages"
                                page={page + 1}
                                count={Math.ceil(clayData.length / pageSize)}
                                onChange={(_, value) => onPageChange(value - 1)}
                            /> :
                            <div style={{ padding: "10px" }}></div>
                        }
                    </> : 
                    <div>No available posts.</div>
                }
            </Suspense>
        </div>
    );
}