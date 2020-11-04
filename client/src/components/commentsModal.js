import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import gridComment from './gridComment'
import { apiUrl } from '../config.js'
import Comment from '../images/comment.svg'
import Close from '../images/close.js'

const CommentsModal = (props) => {
    const [openComment, changeComment] = useState(false)
    const [gridOwner, setOwner] = useState(null)
    const [comment, setComment] = useState('')
    const { user, loadGrid } = props

    //Use effect to get the information for a grid owner for the comment modal anytime a new grid is loaded
    useEffect(() => {
        getOwner()
    }, [loadGrid])

    const getOwner = async () => {
        const token = window.localStorage.getItem('auth_token')
        let response = await fetch(`${apiUrl}/comments/owner_info`, {
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

    const toggleComment = () => {
        if (openComment === false) { changeComment(true) } else { changeComment(false) }
    }

    // function to submit a new comment
    const submitComment = async () => {
        const token = window.localStorage.getItem('auth_token')
        let response = await fetch(`${apiUrl}/comments/new`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                user_id: user.id,
                grid_id: loadGrid.owner,
                content: comment,
            })
        })
        if (response.ok) setComment('')
        console.log('hit fetch')
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
                        <div onClick={toggleComment}><Close /></div>
                    </div>
                    <div className="comments_display">
                        <gridComment />
                    </div>
                    <div className="comments_footer">
                        <div className="footer_side_container">
                            <img className="footer_image" src={user.profile_pic} />
                            <div className="footer_sideborder" />
                        </div>
                        <div className="footer_sub_container">
                            <div className="footer_sub_header">Username: {user.username}</div>
                            <textarea
                                className="comment_input"
                                value={comment}
                                onChange={(e) => { setComment(e.target.value) }}
                                placeholder={'Make a comment here'}
                            />
                        </div>
                    </div>
                    <div className="footer_bottom_container">
                        <div className="footer_bottom_bar" />
                        <button className="drawlife_button" onClick={submitComment}>Submit</button>
                    </div>
                </div>
            }
        </>,
        document.getElementById('commentsmodal')
    )
}

export default CommentsModal