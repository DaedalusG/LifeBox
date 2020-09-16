import React, { useState } from 'react'
import ReactDom from 'react-dom'
import Close from '../images/close.js'

const SignUpModal = ({ openSignUp, closeSignUp }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const updateUsername = (e) => setUsername(e.target.value);
    const updateEmail = (e) => setEmail(e.target.value);
    const updatePassword = (e) => setPassword(e.target.value);
    const updateRePassword = (e) => setRePassword(e.target.value);

    if (!openSignUp) return null
    return ReactDom.createPortal(
        <div className={"signupmodal"}>
            <div className={'signup_close_container'} onClick={closeSignUp}>
                <Close />
            </div>
            <img src='../images/default_profile_pic.png' alt="default_profile_pic"></img>
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
                <button className={"register_button"}>Register</button>
            </div>
        </div >,
        document.getElementById('signupmodal')
    )
}

export default SignUpModal