import React from 'react'
import ReactDom from 'react-dom'
import Close from '../images/close.js'

const DevInfoModal = ({ openDevInfo, closeDevInfo }) => {
    if (!openDevInfo) return null

    return ReactDom.createPortal(
        <div className={"devinfomodal"}>
            <div className={'devinfo_sub_column'}>
                <div className={'top_banner'} />
                <div className={'devinfo_close_container'} onClick={closeDevInfo}>
                    <span className="devinfo_title">About LifeBox</span>
                    <Close />
                </div>
                <p className="devinfo_text">
                    {"LifeBox is a social platform for students to explore complexity in mathematics via the popular cellular automata Conway's Game of Life."}
                </p>
            </div>
            <div className={'bottom_banner'} />
        </div >,
        document.getElementById('devinfomodal')
    )
}

export default DevInfoModal