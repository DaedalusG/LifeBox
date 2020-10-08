import React from 'react'
import ReactDom from 'react-dom'
import Close from '../images/close.js'

const DevInfoModal = ({ openDevInfo, closeDevInfo }) => {
    if (!openDevInfo) return null

    return ReactDom.createPortal(
        <div className={"devinfomodal"}>
            <div className={'signup_close_container'} onClick={closeDevInfo}>
                <Close />
            </div>
        </div >,
        document.getElementById('devinfomodal')
    )
}

export default DevInfoModal