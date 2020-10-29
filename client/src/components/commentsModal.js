import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { apiUrl } from '../config.js'
import Comment from '../images/comment.svg'

const CommentsModal = ({ loadGrid }) => {
    const [openComment, setComment] = useState(false)
    const [gridOwner, setOwner] = useState(null)

    useEffect(() => {
        const getOwner = async () => {
            const token = window.localStorage.getItem('auth_token')
            let response = await fetch(`${apiUrl}/grids/comment_info`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: loadGrid.owner
                })
            })

            const res = await response.json()
            setOwner(res)
        }
        getOwner()
    }, [loadGrid])

    const toggleComment = () => {
        if (openComment === false) { setComment(true) } else { setComment(false) }
    }

    if (loadGrid.name === undefined) return null
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