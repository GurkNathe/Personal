import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";

import { Link } from "react-router-dom";

import { ProgressiveImg } from "./CustomComponent";

import "../css/blog-post.css";

export interface LoadedArticle {
    title: string;
    thumbnailUrl: string;
    tempThumbnailUrl: string;
    summary: string;
    contentUrl: string;
    tags: string[];
    timestamp: string;
    grade_level: (string|number)[];
}

export default function BlogPost({ title, thumbnailUrl, tempThumbnailUrl, summary, contentUrl, tags, timestamp, grade_level} : LoadedArticle) {
    return (
        <Box className="post" component="div">
            <Link to={`/blog/${contentUrl}/article`} className="link">
                <Card variant="outlined">
                    <Grid container>
                        <Grid container item className="top">
                            <Grid item xs={4} className="image-cell">
                                <ProgressiveImg
                                    placeholderSrc={tempThumbnailUrl}
                                    src={thumbnailUrl}
                                    title={title}
                                />
                            </Grid>
                            <Grid container item xs={8} spacing={2} className="text-cell">
                                <Grid item>
                                    <span className="title">{title}</span>
                                    <Grid item className="read-level">
                                        <Chip label={`Readability: ${grade_level[0]}`} variant="outlined" className="chip"/>
                                        <Chip label={`Reading Level: Grade ${grade_level[1]}`} variant="outlined" className="chip"/>
                                    </Grid>
                                    <p className="summary" children={summary}/>
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