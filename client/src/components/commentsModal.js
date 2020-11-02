import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { apiUrl } from '../config.js'
import Comment from '../images/comment.svg'

const CommentsModal = (props) => {
    const [openComment, setComment] = useState(false)
    const [gridOwner, setOwner] = useState(null)
    const { user, loadGrid } = props

    useEffect(() => {
        console.log(gridOwner)
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
            setOwner(res.owner)
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
                <div className="comments_container">
                    <div className="comments_header">
                        <img className="header_image" src={gridOwner.profile_pic} />
                        <div className="header_sub_header">
                            <div className="header_spacer" />
                            <div>Grid Name: {loadGrid.name}</div>
                            <div>Composer: {gridOwner.username}</div>
                            <div className="header_spacer" />
                        </div>
                    </div>
                    <div className="comments_display"></div>
                    <div className="comments_footer">
                        <img className="footer_image" src={user.profile_pic} />
                        <div className="footer_sub_container">
                            <div>Username: {user.username}</div>
                            <textarea className="comment_input" />
                        </div>
                    </div>
                </div>
            }
        </>,
        document.getElementById('commentsmodal')
    )
}

export default CommentsModal