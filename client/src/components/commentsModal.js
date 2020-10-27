import React from 'react'
import ReactDom from 'react-dom'

const CommentsModal = ({ }) => {



    return ReactDom.createPortal(
        <div className="commentsmodal">
            <img src="./images/Conway.jpg" />
        </div>,
        document.getElementById('commentsmodal')
    )
}

export default CommentsModal