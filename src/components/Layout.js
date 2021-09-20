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
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { typography } from '@material-ui/system';
import { format } from 'date-fns';
import { Avatar } from '@material-ui/core';

const drawerWidth = 240



const useStyles = makeStyles((theme) =>{
    return{
        page:{
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
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
        },
        appbar:{
            width:`calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        date:{
            flexGrow: 1
        },
        avatar:{
            marginLeft: theme.spacing(2)
        }

    
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

        <AppBar 
          className={classes.appbar}
          elevation={0}
          >
            <Toolbar>
                <Typography className={classes.date}>
                  Today is the {format(new Date(), 'do MMMM Y')}
                </Typography>
                <Typography>
                    Mario
                </Typography>
                <Avatar src='/mario-av.png' className={classes.avatar}/>
            </Toolbar>
        </AppBar>
        
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
            <div className={classes.toolbar}></div>
            {props.children}
        </div>
        </div>
    )
}

export default Layout
