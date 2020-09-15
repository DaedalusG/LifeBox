import React from 'react'
import ReactDom from 'react-dom'
import Close from '../images/close.js'

const SignUpModal = ({ openSignUp, closeSignUp }) => {
    if (!openSignUp) return null
    return ReactDom.createPortal(
        <div className={"signupmodal"}>
            <div className={'signup_close_container'} onClick={closeSignUp}>
                <Close />
            </div>
            <img src='/Users/wglaptop/Documents/AppAcademy/LifeBox/client/public/default_profile_pic.png' alt="default_profile_pic"></img>
            <div className={"signup_inputs_container"}>
                <input></input>
                <input></input>
                <input></input>
            </div>
            <div>
                <button className={"register_button"}>Register</button>
            </div>
        </div >,
        document.getElementById('signupmodal')
    )
}

export default SignUpModal