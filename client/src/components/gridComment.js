import React from 'react'

const GridComment = (props) => {
    const { username, profile_pic, content } = props.comment

    return (
        <>
            <div className="gridcomment_container">
                <div className="gridcomment_row">
                    <div className="gridcomment_column_image">
                        <img className="gridcomment_user_image" src={profile_pic} />
                        <div className="gridcomment_sidebar" />
                    </div>
                    <div className="gridcomment_column">
                        <div className="gridcomment_username">{username}</div>
                        <div className="gridcomment_content">{content}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GridComment