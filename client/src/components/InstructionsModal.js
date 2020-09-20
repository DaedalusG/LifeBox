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
                <div>
                    <h1>Rule 1</h1>
                    <p>Any live cell with two or three live neighbours survives.</p>
                </div>
                <div>
                    <h1>Rule 2</h1>
                    <p>Any dead cell with three live neighbours becomes a live cell.</p>
                </div>
                <div>
                    <h1>Rule 3</h1>
                    <p>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</p>
                </div>
            </div>
        </Draggable>,
        document.getElementById('instructionsmodal')
    )
}

export default InstructionsModal