import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "@mui/material/styles/styled";
import TextField from "@mui/material/TextField";

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