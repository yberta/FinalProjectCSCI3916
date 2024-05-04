import React from 'react'
import "./Header.css"
import PersonIcon from '@material-ui/icons/Person'
import { IconButton } from  '@material-ui/core'
import ForumIcon from '@material-ui/icons/Forum'
const Header = () => {
    return (
        <div className="Header">
            <IconButton>
                <PersonIcon fontSize="large" className="header_icon"/>
            </IconButton>
            <img className="header.logo" src="logo192-png" alt="header"/>
            <IconButton>
                <ForumIcon fontSize="large" className="header_icon" />
            </IconButton>
        </div>
    )
}

export default Header