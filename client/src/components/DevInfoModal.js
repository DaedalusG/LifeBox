import React from 'react'
import ReactDom from 'react-dom'
import Close from '../images/close.js'

const DevInforModal = () => {

    return ReactDom.createPortal(
        <div>Info</div>,
        document.getElementById('devinfomodal')
    )
}

export default DevInfoModal