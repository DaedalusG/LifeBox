import React, { useState } from 'react'
import ReactDom from 'react-dom'
import Close from '../images/close.js'

const InstructionsModal = ({ openInstructions, closeInstructions }) => {
    if (!openInstructions) return null

    return ReactDom.createPortal(
        <div className={"instructionsmodal"}>
            <div className={'signup_close_container'} onClick={closeInstructions}>
                <Close />
            </div>
        </div>,
        document.getElementById('instructionsmodal')
    )
}

export default InstructionsModal