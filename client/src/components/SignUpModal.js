import React, { useState } from 'react'
import ReactDom from 'react-dom'
import Close from '../images/close.js'
import { apiUrl } from '../config.js'

const SignUpModal = ({ openSignUp, closeSignUp }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const updateUsername = (e) => setUsername(e.target.value);
    const updateEmail = (e) => setEmail(e.target.value);
    const updatePassword = (e) => setPassword(e.target.value);
    const updateRePassword = (e) => setRePassword(e.target.value);


    const registerUser = async (e) => {
        e.preventDefault();
        if (password !== rePassword) {
            console.log('Passwords must match')
            return
        }

        const user = {
            username: username,
            email: email,
            password: password,
        }

        const response = await fetch(`${apiUrl}/auth/signup`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        if (response.ok) {
            console.log("Response Success");
            const res = await response.json();
            if (res.auth_token === undefined) {
                // Need to handle this error with browser message to user
                console.log("Bad Auth Token Generated");
                return;
            } else {
                window.localStorage.setItem("auth_token", res.auth_token);
                window.location.reload();
                // Add redirect here
            }
        } else {
            console.log("Response Failure");
        }
    };

    // Switch on and off
    if (!openSignUp) return null

    return ReactDom.createPortal(
        <div className={"signupmodal"}>
            <div className={'signup_close_container'} onClick={closeSignUp}>
                <Close />
            </div>
            <img src={'../images/default_profile_pic.png'} alt="default_profile_pic"></img>
            <div className={"signup_inputs_container"}>
                <input
                    className="login_input_field"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={updateUsername} />
                <input
                    className="login_input_field"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={updateEmail} />
                <input
                    className="login_input_field"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={updatePassword} />
                <input
                    className="login_input_field"
                    type="password"
                    placeholder="Password"
                    value={rePassword}
                    onChange={updateRePassword} />
            </div>
            <div>
                <button className={"register_button"} onClick={registerUser}>Register</button>
            </div>
        </div >,
        document.getElementById('signupmodal')
    )
}

export default SignUpModal