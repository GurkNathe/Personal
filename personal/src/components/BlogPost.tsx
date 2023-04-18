import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";

import { Link } from "react-router-dom";

import "../css/blog-post.css";

export interface LoadedArticle {
    title: string;
    thumbnailUrl: string;
    summary: string;
    contentUrl: string;
    tags: string[];
    timestamp: string;
}

export default function BlogPost({ title, thumbnailUrl, summary, contentUrl, tags, timestamp} : LoadedArticle) {
    return (
        <Box className="post" component="div">
            <Link to={`/blog/${contentUrl}/article`} className="link">
                <Card variant="outlined">
                    <Grid container>
                        <Grid container item className="top">
                            <Grid item xs={4} className="image-cell">
                                <img 
                                    src={thumbnailUrl} 
                                    alt={title} 
                                />
                            </Grid>
                            <Grid container item xs={8} spacing={2} className="text-cell">
                                <Grid item>
                                    <span className="title">{title}</span>
                                    <ReactMarkdown className="summary" children={summary} remarkPlugins={[remarkGfm]}/>
                                </Grid>
                                <Grid item>
                                    <span className="publish">Published: {(new Date(timestamp)).toDateString()}</span>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className="chip-cell">
                            {tags.map((tag) => (
                                <Chip label={tag} variant="outlined" className="chip" key={tag}/>
                                ))}
                        </Grid>
                    </Grid>
                </Card>
            </Link>
        </Box>
    );
}