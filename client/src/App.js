import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import Login from './components/Login.js'
import RandomLifeBox from './components/RandomLifeBox.js'
import TestCanvas from './components/TestCanvas.js'

import UserList from './components/UsersList';


function App() {
    const loggedIn = window.localStorage.getItem("auth_token");

    return (
        <BrowserRouter>
            {/* <nav>
                <ul>
                    <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                    <li><NavLink to="/users" activeclass="active">Users</NavLink></li>
                </ul>
            </nav> */}
            <Switch>
                <Route path="/users">
                    <UserList />
                </Route>

                <Route path="/">
                    {loggedIn ? <RandomLifeBox /> : <Login />}
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
