import { useParams } from "react-router-dom";


export default function BlogArticle() {
    let { contentUrl } = useParams();

    return <div>Hello fish {contentUrl}</div>;
}