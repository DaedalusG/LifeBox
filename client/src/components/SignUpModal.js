import React from 'react'
import ReactDom from 'react-dom'

const SignUpModal = ({ openSignUp, closeSignUp }) => {
    if (!openSignUp) return null
    return ReactDom.createPortal(
        <div className={"signupmodal"}>
            <div>
                <button onClick={closeSignUp}>Close</button>
            </div>
            <img src="../../public/default_profile_pic.png" alt="default_profile_pic"></img>
            <input></input>
            <input></input>
            <input></input>
            <div>
                <button className={"register_button"}>Register</button>
            </div>
        </div >,
        document.getElementById('signupmodal')
    )
}

export default SignUpModal