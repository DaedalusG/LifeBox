import React from 'react'

const SignUpModal = ({ openSignUp, closeSignUp }) => {
    if (!openSignUp) return null
    return (
        <div>
            <button onClick={closeSignUp}>Close</button>
            <div>Test</div>
        </div>
    )
}

export default SignUpModal