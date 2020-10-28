import React from 'react'
import ReactDom from 'react-dom'
import Conway from '../images/Conway.jpg'


const CommentsModal = ({ }) => {



    return ReactDom.createPortal(
        <div className="commentsmodal">
            <img src={Conway} alt="john_conway" />
        </div>,
        document.getElementById('commentsmodal')
    )
}

export default CommentsModal