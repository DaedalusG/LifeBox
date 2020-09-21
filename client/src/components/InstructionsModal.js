import React, { useState } from 'react'
import ReactDom from 'react-dom'
import Draggable from 'react-draggable';
import Close from '../images/close.js'
import Conway from '../images/Conway.jpg'

const InstructionsModal = ({ openInstructions, closeInstructions }) => {
    if (!openInstructions) return null

    return ReactDom.createPortal(
        <Draggable disabled={false}>
            <div className={"instructionsmodal"}>
                <div className={'instructions_sub_container_row'}>
                    <img id={'Conway'} src={Conway} alt="john_conway"></img>
                    <div className={'instructions_sub_container_row'}>
                        <div className={'instructions_sub_container_column'}>
                            <div className={"instructions_close"}>
                                <div>Conways Game of Life</div>
                                <div onClick={closeInstructions}>
                                    <Close />
                                </div>
                            </div>
                            <div className={'quote'}>"I just thought if you couldn't predict what it did,</div>
                            <div className={'quote'}>it could probably do anything"   <span id={'instructions_title'}>-John Conway</span></div>
                            <div className={'rules'}>
                                <div className={'rule'}><span id={'instructions_title'}>Rule 1:</span>{'Any live cell with two or three live neighbours survives.'}</div>
                                <div className={'rule'}><span id={'instructions_title'}>Rule 2:</span>{'Any dead cell with three live neighbours becomes a live cell.'}</div>
                                <div className={'rule'}><span id={'instructions_title'}>Rule 3:</span>{'All other live cells die in the next generation. Similarly, all other dead cells stay dead.'}</div>
                                <div className={'rule'}></div>
                            </div>
                            <div id={"instructions_title"} className={'quote'}>There is no way to win game of life, and it's questionable wether or not its a game. The brain icon is in development.</div>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable >,
        document.getElementById('instructionsmodal')
    )
}

export default InstructionsModal