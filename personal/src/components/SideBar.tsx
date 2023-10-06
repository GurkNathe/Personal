import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';

import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import SortSharpIcon from '@mui/icons-material/SortSharp';

import { Link } from "react-router-dom";

import "../css/sidebar.css";

interface BarProps {
    blur: boolean;
    top: number;
    left: number;
}

export default function SideBar({ blur, top, left }: BarProps) {
    const [open, toggleDrawer] = useState<boolean>(false);

    const barItem = (text: string, icon: React.ReactNode, page: string, toggle: Function): JSX.Element => (
        <ListItem>
            <Link className="bar-link" to={page}>
                <ListItemButton onClick={() => toggle(false)}>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItemButton>
            </Link>
        </ListItem>
    )

    const handleClickAway = () => {
        if (open) {
            toggleDrawer(false);
        }
    }

    const StyledButton = styled(Button)(() => ({
        opacity: open ? 0 : 1,
        visibility: open ? "hidden" : "visible",
        color: "white",
        backgroundColor: "#181818",
        "&:hover": {
            backgroundColor: blur ? "" : "#686868",
            outline:  blur ? "" : "3px solid white"
        },
        background: blur ? "radial-gradient(#181818, transparent 75%, transparent)" : ""
    }))

    return(
        <div 
            className="drawer"
            style={{
                top: `${top}px`, 
                left: `${left}px` 
            }}
        >
            <StyledButton onClick={() => toggleDrawer(true)} aria-label="Open Navigation Bar">
                <SortSharpIcon className="button-icon"/>
            </StyledButton>
            <div 
                className="bar" 
                style={{ 
                    opacity: !open ? 0 : 1, 
                    visibility: open ? 'visible' : 'hidden'
                }}
            >
                <div className="open">
                    <div className="bar-list">
                        <List>
                            {barItem("Home", <HouseRoundedIcon htmlColor="#fff"/>, "/", toggleDrawer)}
                            {barItem("About Me", <PersonIcon htmlColor="#fff"/>, "/about-me", toggleDrawer)}
                            {barItem("Blog", <MessageIcon htmlColor="#fff"/>, "/blog", toggleDrawer)}
                        </List>
                    </div>
                    <div className="bar-links">
                        <Grid container className="bar-links-grid">
                            <Grid item xs={5}>
                                <MuiLink href="https://github.com/GurkNathe/" color="inherit">
                                    GitHub
                                </MuiLink>
                            </Grid>
                            <Grid item xs={1.5}>
                                <span>
                                    {"•"}
                                </span>
                            </Grid>
                            <Grid item xs={5}>
                                <MuiLink href="https://www.linkedin.com/in/ethan-krug-5a3088171" color="inherit">
                                    LinkedIn
                                </MuiLink>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className='fade' onClick={() => handleClickAway()}></div>
            </div>
        </div>
    );
}