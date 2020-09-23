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

        if (response.ok) {
            console.log("inside tryLogin: Success");
        } else {
            console.log("inside tryLogin: Response failure");
        }
        const res = await response.json()
        if (res.auth_token !== undefined) {
            window.localStorage.setItem('auth_token', res.auth_token)
            window.location.reload()
        }
    };

    const loginDemoUser = async () => {
        const demoUsername = "xenomorph";
        const demoPassword = "password"
        let speed = 70, i = 1, k = 0;

        const ghostWriteUsername = () => {
            if (i <= demoUsername.length) {
                let text = demoUsername.slice(0, i);
                setUsername(text);
                i++;
                setTimeout(ghostWriteUsername, speed);
            }
        }
        const ghostWritePassword = () => {
            if (k <= demoPassword.length) {
                let text = demoPassword.slice(0, k);
                setPassword(text);
                k++;
                setTimeout(ghostWritePassword, speed);
            }
        }
        ghostWriteUsername();
        setTimeout(ghostWritePassword, speed * demoUsername.length);
        const demoLogin = async () => {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: `${demoUsername}`, password: `${demoPassword}` }),
            });
            const res = await response.json()
            if (res.auth_token !== undefined) {
                window.localStorage.setItem('auth_token', res.auth_token)
                window.location.reload()
            }
        }
        setTimeout(demoLogin, 1500);
    }

    return (
        <div className={"login_container"}>
            <div className={"login_form_container"}>
                <div className={"login_sub_container"}>
                    <Glider />
                    <div className={"login_header"}>Log in to LifeBox</div>
                </div>
                <div className={'login_sub_container'}>
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
                </div>
                <div className={"login_sub_container"}>
                    <div className={"signup_link"} onClick={() => setSignUp(true)}>Need a Login?</div>
                    <div className={"signup_link"} onClick={loginDemoUser}>Sign in as Demo</div>
                </div>
            </div>
            <SignUpModal openSignUp={openSignUp} closeSignUp={() => setSignUp(false)} />
            <RandomLifeBox className={"login_background"} />
        </div >
    )
}

export default Login