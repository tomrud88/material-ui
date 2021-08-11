import { makeStyles } from '@material-ui/core'
import { CallMissedSharp, SubjectOutlined, AddCircleOutlineOutlined } from '@material-ui/icons'
import React from 'react';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { Drawer } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { useHistory,useLocation } from 'react-router-dom';

const drawerWidth = 240



const useStyles = makeStyles({
    page:{
        background: '#f9f9f9',
        width: '100%'
    },
    drawer:{
        width: drawerWidth
    },
    drawer:{
        width: drawerWidth
    },
    root:{
        display: 'flex'
    },
    active:{
        background: '#f4f4'
    }
})

function Layout(props) {
    const classes = useStyles()
    const location = useLocation()
    const history = useHistory()

    const menuItems = [
        {
            text:'My Notes',
            icon: <SubjectOutlined color='secondary'/>,
            path: '/'
        },
        {
            text:'Create Note',
            icon: <AddCircleOutlineOutlined color='secondary'/>,
            path: '/create'
        }
    ]
    return (
       <div className={classes.root}>
        
        <Drawer
        className={classes.drawer}
        variant='permanent'
        anchor='left'
        classes={{ paper: classes.drawerPaper}}
        >
            <div>
                <Typography variant='h5'>
                   Ninja Notes
                </Typography>
            </div>

            <List>
                {menuItems.map(item =>(
                    <ListItem
                    button
                    key={item.text}
                    onClick={()=> history.push(item.path)}
                    className={location.pathname == item.path ? classes.active : null}
                    >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text}/>
                    </ListItem>
                ))}
            </List>
        </Drawer>

        <div className={classes.page}>
            {props.children}
        </div>
        </div>
    )
}

export default Layout
