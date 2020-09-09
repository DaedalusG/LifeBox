import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import LifeBox from './components/LifeBox.js'

import UserList from './components/UsersList';


function App() {

    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                    <li><NavLink to="/users" activeclass="active">Users</NavLink></li>
                </ul>
            </nav>
            <Switch>
                <Route path="/users">
                    <UserList />
                </Route>

                <Route path="/">
                    <LifeBox />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
