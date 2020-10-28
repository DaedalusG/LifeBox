import React from 'react'
import ReactDom from 'react-dom'
import Comment from '../images/comment.svg'

const CommentsModal = ({ openComments, closeComments }) => {
    if (!openComments) return null


    return ReactDom.createPortal(
        <div className="commentsmodal">
            <img src={Comment} alt='comment_icon' className={'comments_icon'} />
        </div>,
        document.getElementById('commentsmodal')
    )
}

export default CommentsModal