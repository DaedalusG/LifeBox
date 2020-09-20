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
                <div className={'instructions_sub_container_row'}>
                    <img id={'Conway'} src={Conway} alt="john_conway"></img>
                    <div className={'instructions_sub_container_column'}>
                        <div className={"instructions_close"} onClick={closeInstructions}>
                            <Close />
                        </div>
                        <div> Rules Conway's Game of Life</div>
                    </div>
                </div>
            </div>
        </Draggable >,
        document.getElementById('instructionsmodal')
    )
}

export default InstructionsModal