import { useParams } from "react-router-dom";


export default function BlogArticle() {
    let { contentUrl } = useParams();

    return <div>Hello fish {contentUrl}</div>;
}

// 

export const articleTextLoader = async (url: string | undefined) => {
    const res = await fetch(`https://raw.githubusercontent.com/GurkNathe/Personal/main/articles/articles/${url}.md`);
    return res;
};