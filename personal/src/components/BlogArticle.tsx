import { useLoaderData } from "react-router-dom";

import Paper from "@mui/material/Paper";

import ReactMarkdown from "react-markdown";

import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkImages from "remark-images";
import remarkUnwrapImages from "remark-unwrap-images";

import "../css/blog-article.css";

export const articleTextLoader = async (url: string | undefined) => {
    const res = await fetch(`https://raw.githubusercontent.com/GurkNathe/Personal/main/articles/articles/${url}.md`);
    return res;
};

export default function BlogArticle() {
    const data = useLoaderData() as string;

    return (
        <div className="page">
            <Paper className="article-paper">
                <ReactMarkdown
                    className="article"
                    children={data}
                    remarkPlugins={[remarkImages, remarkParse, remarkGfm, remarkUnwrapImages]}
                    rehypePlugins={[rehypeStringify]}
                />
            </Paper>
        </div>
    );
}
