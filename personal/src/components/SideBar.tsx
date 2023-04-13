import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MuiLink from '@mui/material/Link';

import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';

import { Link } from "react-router-dom";

import "../css/sidebar.css";

export default function SideBar() {
    const [open, toggleDrawer] = useState(false);

    const barItem = (text: string, icon: React.ReactNode, page: string, toggle: Function) => (
        <ListItem>
            <Link className="link" to={page}>
                <ListItemButton onClick={() => toggle(false)}>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItemButton>
            </Link>
        </ListItem>
    )

    return(
        <div className="bar">
            <Button onClick={() => toggleDrawer(true)}>
                <MenuRoundedIcon className="button-icon"/>
            </Button>
            <Drawer
                anchor="left"
                open={open}
                onClose={() => toggleDrawer(false)}
            >
                <div className='drawer'>
                    <List>
                        {barItem("Home", <HouseRoundedIcon htmlColor="#fff"/>, "/", toggleDrawer)}
                        {barItem("About Me", <PersonIcon htmlColor="#fff"/>, "/about-me", toggleDrawer)}
                        {barItem("Blog", <MessageIcon htmlColor="#fff"/>, "/blog", toggleDrawer)}
                    </List>
                </div>
                <div className="links">
                    <Grid container className="links-grid">
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
            </Drawer>
        </div>
    );
}