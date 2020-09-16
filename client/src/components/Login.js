import React, { useState } from 'react'
import RandomLifeBox from './RandomLifeBox.js'
import SignUpModal from './SignUpModal.js'
import Glider from '../images/glider.js'
import { apiUrl } from '../config.js'


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [openSignUp, setSignUp] = useState(false)

    const updateUsername = (e) => setUsername(e.target.value);
    const updatePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = async () => {
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: `${username}`, password: `${password}` }),
        });

        console.log(username, password, response)

        if (response.ok) {
            console.log("inside tryLogin: Success");
        } else {
            console.log("inside tryLogin: Response failure");
        }
        const res = await response.json()
        if (res.auth_token != undefined) {
            window.localStorage.setItem('auth_token', res.auth_token)
            window.location.reload()
        }
    };


    return (
        <div className={"login_container"}>
            <div className={"login_form_container"}>
                <Glider />
                <div className={"login_header"}>Log in to LifeBox</div>
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
                <button className={"login_form_submit"} onClick={handleLoginSubmit}>Submit</button>
                <div className={"signup_link"} onClick={() => setSignUp(true)}>Need an Account?</div>
                <div className={"signup_link"}>Sign in as Demo</div>
            </div>
            <SignUpModal openSignUp={openSignUp} closeSignUp={() => setSignUp(false)} />
            <RandomLifeBox className={"login_background"} />
        </div >
    )
}

export default Login