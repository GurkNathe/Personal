import { Suspense, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { SelectChangeEvent } from "@mui/material/Select";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

import { create, insert, search } from "@orama/orama";
import { OpaqueDocumentStore, OpaqueIndex, Orama, Schema } from "@orama/orama/dist/types";

import BlogPost, { LoadedArticle } from "./BlogPost";

import {
    Loader,
    PageSizeSelect,
    SearchField,
    SelectForm
} from "./CustomComponent";

import "../css/blog-list.css";

export const articleLoader = async (): Promise<any> => {
    const res = await fetch("https://raw.githubusercontent.com/GurkNathe/Personal/main/articles/articles.json");
    const articles = res.json();
    return articles;
};

type OramaSearch = Orama<{ Schema: Schema; Index: OpaqueIndex; DocumentStore: OpaqueDocumentStore; }>;

export default function BlogList() {
    const data = useLoaderData() as LoadedArticle[];
    const [searchDB, setSearch] = useState<OramaSearch>({} as OramaSearch);
    const [clayData, setClayData] = useState<LoadedArticle[]>(data);
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
    }, [clayData, data, pageSize]);

    const searchMaker = async (data: LoadedArticle[]): Promise<OramaSearch> => {
        const search = await create({
            schema: {
                title: "string",
                thumbnailUrl: "string",
                tempThumbnailUrl: "string",
                summary: "string",
                contentUrl: "string",
                tags: "string",
                timestamp: "string",
                grade_level: "string"
            }
        })

        data.forEach(async (value) => {
            await insert(search, {
                ...value,
                tags: value.tags.join(","),
                timestamp: value.timestamp + " " + (new Date(value.timestamp)).toDateString(),
                grade_level: value.grade_level.join(",")
            })
        });

        return search;
    };

    const onPageChange = (page: number): void => {
        setPosts(clayData.slice(pageSize * page, pageSize + (pageSize * page)));
        setPage(page);
    };

    const onSearch = async (query: string): Promise<void> => {
        setSearchValue(query);
        if (query === "") {
            setClayData(data);
            setPosts(data.slice(0, pageSize));
        } else {
            const result = await search(searchDB, {
                term: query,
                properties: ["title", "summary", "tags", "timestamp", "grade_level"],
            })

            if (result.count === 0) {
                setClayData([]);
                setPosts([]);
            } else {
                let newData = data.filter((datum) => {
                    return result.hits.some((hit) => {
                        return datum.contentUrl === hit.document.contentUrl;
                    })
                });

                setClayData(newData);
                setPosts(newData.slice(0, pageSize));
            }
        }
    };

    const changePageSize = (event: SelectChangeEvent<unknown>): void => {
        let pSize: number = Number(event.target.value);

        setPosts(clayData.slice(0, pSize));
        setPageSize(pSize);

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
                        <Loader />
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
                                tempThumbnailUrl={datum.tempThumbnailUrl}
                                summary={datum.summary}
                                contentUrl={datum.contentUrl}
                                tags={datum.tags}
                                timestamp={datum.timestamp}
                                grade_level={datum.grade_level}
                            />
                        ))}
                        {data.length > 5 ? 
                            <SelectForm className="page-size" size="small">
                                <InputLabel>Page Size</InputLabel>
                                <PageSizeSelect
                                    value={String(pageSize)}
                                    onChange={(event) => changePageSize(event)}
                                >
                                    <MenuItem value={5}>Five</MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={15}>Fifteen</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </PageSizeSelect>
                            </SelectForm> : null
                        }
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
                    <>
                        {data ?
                            <Loader/> :
                            <div>No available posts.</div>
                        }
                    </>
                    
                }
            </Suspense>
        </div>
    );
}