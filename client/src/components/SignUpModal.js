import React from 'react'
import ReactDom from 'react-dom'

const SignUpModal = ({ open, onClose }) => {
    if (!open) return null;
    return ReactDom.createPortal(
        <div>
            Test
            <button onClick={onClose}>Close Modal</button>
        </div>,
        document.getElementById("signup")
    )
}

export default SignUpModal