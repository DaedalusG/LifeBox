import React, { useState } from 'react'
import RandomLifeBox from './RandomLifeBox.js'
import Glider from '../images/Glider.js'


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const updateUsername = (e) => setUsername(e.target.value);
    const updatePassword = (e) => setPassword(e.target.value);

    return (
        <div className={"login_container"}>
            <div className={"login_form"}>
                <Glider />
                <input
                    className="login_input_field"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={updateUsername} />
                <input
                    className="login_input_field"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={updatePassword} />
            </div>
            <RandomLifeBox className={"login_background"} />
        </div>
    )
}

export default Login