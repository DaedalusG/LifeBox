import React, { useState } from 'react'
import ReactDom from 'react-dom'
import Draggable from 'react-draggable';
import Close from '../images/close.js'
import Conway from '../images/Conway.jpg'

const InstructionsModal = ({ openInstructions, closeInstructions }) => {
    if (!openInstructions) return null

    return ReactDom.createPortal(
        <Draggable>
            <div className={"instructionsmodal"}>
                <div className={'instructions_sub_container'}>
                    <div className={'instructions_sub_container'}>
                        <img id={'Conway'} src={Conway} alt="john_conway"></img>
                    </div>
                    <div className={'instructions_close_container'} onClick={closeInstructions}>
                        <Close />
                    </div>
                </div>
            </div>
        </Draggable>,
        document.getElementById('instructionsmodal')
    )
}

export default InstructionsModal