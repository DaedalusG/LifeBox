import React, { useState } from 'react'
import ReactDom from 'react-dom'
import ReactS3, { uploadFile } from 'react-s3';
import Close from '../images/close.js'
import { apiUrl } from '../config.js'

const SignUpModal = ({ openSignUp, closeSignUp }) => {

    //credentials for upload of custom profile picture
    const config = {
        bucketName: process.env.REACT_APP_BUCKETNAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESSKEYID,
        secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY
    }

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState("")
    const [profilePic, setProfilePic] = useState("https://life-box-app.s3-us-west-2.amazonaws.com/default_profile_pic.png")

    const updateUsername = (e) => setUsername(e.target.value);
    const updateEmail = (e) => setEmail(e.target.value);
    const updatePassword = (e) => setPassword(e.target.value);
    const updateRePassword = (e) => setRePassword(e.target.value);

    const uploadImage = (e) => {
        setProfilePic(URL.createObjectURL(e.target.files[0]))
    }

    const registerUser = async (e) => {
        e.preventDefault();

        uploadFile(profilePic, config)
            .then(data => console.log(data))
            .catch(err => console.error(err))


        const user = {
            username: username,
            email: email,
            password: password,
            rePassword: rePassword,
            profile_pic: profilePic
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
            const res = await response.json();
            setError(res.message)
        }
    };

    // Switch on and off
    if (!openSignUp) return null

    return ReactDom.createPortal(
        <div className={"signupmodal"}>
            <div className={'signup_close_container'} onClick={closeSignUp}>
                <Close />
            </div>
            <div className={"signup_sub_container"}>
                <label htmlFor={'signup-image'} className={"signup_image_upload"}>
                    <img src={profilePic} alt="default_profile_pic"></img>
                </label>
                <input id={'signup-image'} style={{ display: 'none' }} type="file" onChange={uploadImage}></input>
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
                        placeholder="rePassword"
                        value={rePassword}
                        onChange={updateRePassword} />
                </div>
                <div>
                    <button className={"register_button"} onClick={registerUser}>Register</button>
                </div>
                <div className={'signup_error'}>{error}</div>
            </div>
        </div >,
        document.getElementById('signupmodal')
    )
}

export default SignUpModal