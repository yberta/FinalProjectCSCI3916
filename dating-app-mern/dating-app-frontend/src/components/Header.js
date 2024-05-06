import React from 'react'
import './Header.css'
import PersonIcon from '@material-ui/icons/Person'
import IconButton from '@material-ui/core/IconButton'
import ForumIcon from '@material-ui/icons/Forum'
import {Navbar, Nav} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import {logoutUser} from "../actions/authActions";
import { useDispatch, useSelector } from 'react-redux';
import {connect} from 'react-redux';
function Header () {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const history = useHistory();
    const goToMatches = () => {
        history.push('/matches');
    }
    const logout = () => {
        dispatch(logoutUser());
    };
        return(
        <div className="header">
            <Navbar expand="xxl" bg="white" variant="light">
                <Navbar.Brand>Dating App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/" className={loggedIn ? "" : "disabled"}>Home</Link>
                        <Link to="/" onClick={loggedIn ? logout : null}>
                            {loggedIn ? 'Logout' : 'Login'}
                        </Link>
                    </Nav>
                            </Navbar.Collapse>
                            </Navbar>
            <img className="header__logo" src="logo192.png" alt="header" />
            <IconButton onClick = {goToMatches}>
                <PersonIcon fontSize="large" className="header__icon" />
            </IconButton>
        </div>
     );
}

export default Header