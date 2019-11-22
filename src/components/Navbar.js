import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link, colors } from '@material-ui/core'
const NavBar = () => {
    return(
        <div>
        <AppBar position="static" style={{backgroundColor: "#17408B"}}>
            <Toolbar>
                <a style={{textDecoration: 'none', color: 'white'}} href="/">
                <Typography variant="title" color="inherit">
                    NBA
                </Typography>
                </a>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default NavBar;