import React from 'react';

import { useLoaderData } from "react-router-dom";

import Paper from "@mui/material/Paper";

import ReactMarkdown from "react-markdown";

import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";

import "../css/blog-article.css";

export const articleTextLoader = async (url: string | undefined) => {
    const res = await fetch(`https://raw.githubusercontent.com/GurkNathe/Personal/main/articles/articles/${url}.md`);
    return res;
};

interface CustomHeaderProps {
    level: number;
    children: React.ReactNode[];
}

export default function BlogArticle() {
    const data = useLoaderData() as string;

    const slug = (text: string) => {
        return text.toLowerCase().replace(/[^\w]+/g, '-');
    };

    const CustomHeader: React.FC<CustomHeaderProps> = ({ level, children }) => {
        const tagName = `h${level}`;
        const id = slug(children!.toString());
        return React.createElement(tagName, { id }, children);
    };

    const updateMarkdownTOCLinks = (markdownText: string) => {
        const headerRegex = /^#+\s+(.*)$/gm;
        const tocRegex = /\[TOC\]\((.*)\)/g;
        
        const headerMap: any = {};
        
        let match;
        while ((match = headerRegex.exec(markdownText)) !== null) {
            const headerText = match[1];
            const headerId = slug(headerText);
            headerMap[headerText] = headerId;
        }
        
        return markdownText.replace(tocRegex, (match: string, linkText: string) => {
            const targetId = headerMap[linkText];
            return targetId ? `[\${linkText}](#\${targetId})` : match;
        });
    };

    return (
        <div className="page">
            <Paper className="article-paper">
                <ReactMarkdown
                    className="article"
                    children={updateMarkdownTOCLinks(data)}
                    remarkPlugins={[remarkParse, remarkGfm]}
                    rehypePlugins={[rehypeStringify]}
                    components={{ 
                        h1: CustomHeader, 
                        h2: CustomHeader, 
                        h3: CustomHeader, 
                        h4: CustomHeader, 
                        h5: CustomHeader, 
                        h6: CustomHeader 
                    }}
                />
            </Paper>
        </div>
    );
}
