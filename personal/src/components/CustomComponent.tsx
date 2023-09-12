import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "@mui/material/styles/styled";
import TextField from "@mui/material/TextField";

import "../css/custom.css";

export const PageSizeSelect = styled(Select)({
    '.MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
    }
});

export const SearchField = styled(TextField)({
    "& label.Mui-focused": {
        color: "black"
    },
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "black"
        }
    }
});

export const SelectForm = styled(FormControl)({
    "& label.Mui-focused": {
        color: "black"
    },
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "black"
        }
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