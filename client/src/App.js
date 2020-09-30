import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login.js'
import HomePage from './components/HomePage.js'
import UserList from './components/UsersList';


function App() {
    const loggedIn = window.localStorage.getItem("auth_token");

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/users">
                    <UserList />
                </Route>

                <Route path="/">
                    {loggedIn ? <HomePage /> : <Login />}
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
