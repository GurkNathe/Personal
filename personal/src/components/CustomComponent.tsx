import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
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

export const CustomProgress = styled(CircularProgress)({
    "&.MuiCircularProgress-colorPrimary": {
        color: "black"
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