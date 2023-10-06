import { useLoaderData } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import SideBar from "./SideBar";

import "../css/blog-article.css";

export const articleTextLoader = async (url: string | undefined): Promise<Response> => {
    const res = await fetch(`https://raw.githubusercontent.com/GurkNathe/Personal/main/articles/articles/${url}.html`);
    return res;
};

export default function BlogArticle() {
    const data = useLoaderData() as string;

    return (
        <Grid container direction="column" className="article-page">
            <Grid item container xs={2} className="article-header">
                <SideBar blur={false} top={20} left={10}/>
            </Grid>
            <Grid item container xs={7} className="article-body">
                <Paper className="article-paper">
                    <div className="article" dangerouslySetInnerHTML={{ __html: data }}/>
                </Paper>
            </Grid>
        </Grid>
    );
}
