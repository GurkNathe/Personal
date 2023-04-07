import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";

import "../css/blog-post.css";

export interface BlogItem {
    title: string;
    thumbnailUrl: string;
    summary: string;
    content: string;
    tags: string[];
    timestamp: Date;
}

export default function BlogPost({ title, thumbnailUrl, summary, content, tags, timestamp} : BlogItem) {
    return (
        <Box className="post">
            <Card variant="outlined">
                <div style={{display: "flex"}}>
                    <img 
                        className="image"
                        src={thumbnailUrl} 
                        alt={title} 
                    />
                    <div style={{padding: "10px"}}>
                        <h2>{title}</h2>
                        <ReactMarkdown children={summary} remarkPlugins={[remarkGfm]}/>
                    </div>
                </div>
                <div style={{margin: "10px"}}>
                    {tags.map((tag) => (
                        <Chip label={tag} variant="outlined" className="chip" key={tag}/>
                    ))}
                </div>
            </Card>
        </Box>
    );
}