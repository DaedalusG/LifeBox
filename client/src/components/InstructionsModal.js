import React, { useState } from 'react'
import ReactDom from 'react-dom'
import Draggable from 'react-draggable';
import Close from '../images/close.js'

const InstructionsModal = ({ openInstructions, closeInstructions }) => {
    if (!openInstructions) return null

    return ReactDom.createPortal(
        <Draggable>
            <div className={"instructionsmodal"}>
                <div className={'login_close_container'} onClick={closeInstructions}>
                    <Close />
                </div>
            </div>
        </Draggable>,
        document.getElementById('instructionsmodal')
    )
}

export default InstructionsModal