import { useLoaderData } from "react-router-dom";

import ReactMarkdown from "react-markdown";

import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";

import "../css/blog-article.css";

export const articleTextLoader = async (url: string | undefined) => {
    const res = await fetch(`https://raw.githubusercontent.com/GurkNathe/Personal/main/articles/articles/${url}.md`);
    return res;
};

export default function BlogArticle() {
    const data = useLoaderData() as string;

    return (
        <div className="page">
            <ReactMarkdown
                className="article"
                children={data}
                remarkPlugins={[remarkParse, remarkGfm]}
                rehypePlugins={[rehypeStringify]}
            />
        </div>
    );
}
