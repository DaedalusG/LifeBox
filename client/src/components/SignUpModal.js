import React from 'react'
import ReactDom from 'react-dom'

const SignUpModal = ({ openSignUp, closeSignUp }) => {
    if (!openSignUp) return null
    return ReactDom.createPortal(
        <div>
            <button onClick={closeSignUp}>Close</button>
            <div>Test</div>
        </div>,
        document.getElementById('signupmodal')
    )
}

export default SignUpModal