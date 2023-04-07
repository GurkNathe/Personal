import React, { useState } from 'react';

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MessageIcon from '@mui/icons-material/Message';

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
            <SwipeableDrawer
                className="drawer"
                anchor="right"
                open={open}
                onOpen={() => toggleDrawer(true)}
                onClose={() => toggleDrawer(false)}
            >
                <List>
                    {barItem("Home", <HouseRoundedIcon/>, "/", toggleDrawer)}
                    {barItem("Blog", <MessageIcon/>, "/blog", toggleDrawer)}
                </List>
            </SwipeableDrawer>
        </div>
    );
}