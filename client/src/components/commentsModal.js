import React from 'react'
import ReactDom from 'react-dom'
import Draggable from 'react-draggable'

const CommentsModal = ({ }) => {



    return ReactDom.createPortal(
        <div></div>,
        document.getElementById('commentsModal')
    )
}

export default CommentsModal