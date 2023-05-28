import { useLoaderData } from "react-router-dom";

import Paper from "@mui/material/Paper";

import "../css/blog-article.css";

export const articleTextLoader = async (url: string | undefined): Promise<Response> => {
    const res = await fetch(`https://raw.githubusercontent.com/GurkNathe/Personal/main/articles/articles/${url}.html`);
    return res;
};

export default function BlogArticle() {
    const data = useLoaderData() as string;

    return (
        <div className="page">
            <Paper className="article-paper">
                <div className="article" dangerouslySetInnerHTML={{ __html: data }}/>
            </Paper>
        </div>
    );
}
