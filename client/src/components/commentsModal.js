import React from 'react'
import ReactDom from 'react-dom'
import Comment from '../images/comment.svg'

const CommentsModal = ({ }) => {



    return ReactDom.createPortal(
        <div className="commentsmodal">
            <img src={Comment} alt='comment_icon' className={'info_link'} />
        </div>,
        document.getElementById('commentsmodal')
    )
}

export default CommentsModal