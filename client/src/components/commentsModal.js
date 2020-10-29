import React, { useState } from 'react'
import ReactDom from 'react-dom'
import Comment from '../images/comment.svg'

const CommentsModal = ({ loadGrid }) => {
    const [openComment, setComment] = useState(false)
    if (loadGrid.name === undefined) return null

    const toggleComment = () => {
        if (openComment === false) { setComment(true) } else { setComment(false) }
    }

    return ReactDom.createPortal(
        <>
            <div className="comments_icon_container">
                <img
                    src={Comment}
                    alt='comment_icon'
                    className={'comments_icon'}
                    onClick={() => toggleComment()}
                />
            </div>
            {openComment &&
                <div className="comments_container"></div>
            }
        </>,
        document.getElementById('commentsmodal')
    )
}

export default CommentsModal