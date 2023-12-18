import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import styled from "@mui/material/styles/styled";

import "../css/custom.css";

/* Blog List components */

const bgColor = "var(--bar-color)";
const fontColor = "white";

export const SearchField = styled(TextField)({
    "& input": {
        color: fontColor
    },
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "white"
        }
    }
});

export const Post = styled(Box)({
    "& .MuiGrid-root": {
        background: bgColor,
        color: fontColor
    }
});

export const Info = styled(Chip)({
    color: fontColor
});

export const SelectForm = styled(FormControl)({
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "white"
        }
    }
});

export const PageSizeSelect = styled(Select)({
    ".MuiSelect-icon": {
        color: "white"
    },
    ".MuiOutlinedInput-input": {
        color: fontColor
    },
    '.MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'grey',
    }
});

export const PageSizeOption = styled(MenuItem)({
    color: fontColor,
    backgroundColor: bgColor,
    "&.Mui-selected": {
        "&:hover": {
            backgroundColor: "#808080",
        },
        backgroundColor: "#474747",
        color: 'light grey'
    },
    "&:hover": {
        color: "#eee",
        backgroundColor: "#373737"
    }
});

type Img = {
    placeholderSrc: string;
    src: string;
    title: string;
}

export const ProgressiveImg = ({ placeholderSrc, src, title }: Img) => {
    const [imgSrc, setImgSrc] = useState<string>(placeholderSrc || src);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImgSrc(src);
        };
    }, [src]);

    const customClass: string = placeholderSrc && imgSrc === placeholderSrc ? "loading" : "loaded";

    return (
        <img
            src={imgSrc}
            alt={title}
            rel="preload"
            loading="lazy"
            className={customClass}
        />
    );
};

/* Blog List components */

export const Loader = () => {
    return(
        <svg className="loader" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
            <path d="M 100, 100 Q 120,80 140, 100 L 130,120 Q 120,140 110,120 Z" fill="pink" stroke="black" strokeWidth="1"/>
            <path d="M 100, 100 Q 120,80 140, 100 L 130,120 Q 120,140 110,120 Z" fill="pink" stroke="black" strokeWidth="1" transform="rotate(72, 100, 100)"/>
            <path d="M 100, 100 Q 120,80 140, 100 L 130,120 Q 120,140 110,120 Z" fill="pink" stroke="black" strokeWidth="1" transform="rotate(144, 100, 100)"/>
            <path d="M 100, 100 Q 120,80 140, 100 L 130,120 Q 120,140 110,120 Z" fill="pink" stroke="black" strokeWidth="1" transform="rotate(216, 100, 100)"/>
            <path d="M 100, 100 Q 120,80 140, 100 L 130,120 Q 120,140 110,120 Z" fill="pink" stroke="black" strokeWidth="1" transform="rotate(288, 100, 100)"/>
            <circle cx="100" cy="100" r="10" fill="yellow" stroke="black" strokeWidth="1"/>
        </svg>
    );
}

export const ArticlePaper = styled(Paper)({
    backgroundColor: bgColor
})