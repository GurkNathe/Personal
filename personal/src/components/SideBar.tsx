import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MessageIcon from '@mui/icons-material/Message';

import { Link } from "react-router-dom";

import "../css/sidebar.css";

// TODO: Add links to GitHub, LinkedIn, etc. at bottom of bar

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
                anchor="right"
                open={open}
                onClose={() => toggleDrawer(false)}
            >
                <div className='drawer'>
                    <List>
                        {barItem("Home", <HouseRoundedIcon/>, "/", toggleDrawer)}
                        {barItem("Blog", <MessageIcon/>, "/blog", toggleDrawer)}
                    </List>
                </div>
            </Drawer>
        </div>
    );
}