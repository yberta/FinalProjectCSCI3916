import React  from 'react';
import './App.css';
import Header from './components/Header';
import DatingCards from './components/DatingCards';
import SwipeButtons from './components/SwipeButtons';
import Authentication from './components/authentication';

import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Matches from "./components/Matches";


function App({ loggedIn }) {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {loggedIn ? <Redirect to="/home" /> : <Authentication />}
                </Route>
                <Route path="/home">
                    {loggedIn ? (
                        <div>
                            <Header />
                            <DatingCards />
                            <SwipeButtons />
                        </div>) : <Redirect to="/" />}
                </Route>
                <Route path="/matches">
                    {loggedIn ? <Matches /> : <Redirect to="/" />}
                </Route>
            </Switch>
        </Router>
    );
}

const mapStateToProps = (state) => ({
    loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(App);