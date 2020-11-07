import React from 'react'

const GridComment = (props) => {
    const { username, profile_pic, content } = props.comment

    return (
        <>
            <div className="grid_comment_container">
                <div>
                    <img src={profile_pic} />
                </div>
                <div>
                    <div>{username}</div>
                    <div>{content}</div>
                </div>
            </div>
        </>
    )
}

export default GridComment