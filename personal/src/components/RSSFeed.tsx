import { useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { LoadedArticle } from "./BlogPost";

import RSS from "./RSS";

export const articleLoader = async (): Promise<any> => {
    const res = await fetch("https://raw.githubusercontent.com/GurkNathe/Personal/main/articles/articles.json");
    const articles = res.json();
    return articles;
};

export default function RSSFeed() {
    const data = useLoaderData() as LoadedArticle[];
    const [xml, setXML] = useState<Document>();
    const parser = useMemo(() => {
        return new DOMParser();
    }, []);
    const serial = new XMLSerializer();

    useEffect(() => {
        let feed = new RSS({
            title: "Ethan's Blog",
            description: "A catalogue of my various articles.",
            url: "https://gurknathe.github.io/Personal/#/rss.xml",
            copyright: "2023 Ethan Krug",
            language: "en"
        });

        data.forEach((item) => {
            feed.addItem({
                title:  item.title,
                description: item.summary,
                url: `https://gurknathe.github.io/Personal/#/blog/${item.contentUrl}/article`,
                guid: item.contentUrl,
                categories: item.tags,
                author: 'Ethan Krug',
                date: item.timestamp
            });
        })

        setXML(parser.parseFromString(feed.createXML(), "application/xml"));
    }, [data, parser]);

    return(
        <div>
            <a href={process.env.PUBLIC_URL + "/resources/articles.xml"} target="_blank" rel="noreferrer">
                Go To Feed
            </a>
            <br/>
            {
                xml ? 
                <a href={URL.createObjectURL(new Blob([serial.serializeToString(xml!)], { type: 'text/xml' }))} download="articles.xml" target="_blank" rel="noreferrer">
                    Download Feed
                </a> :
                <></>
            }
        </div>
    )
}