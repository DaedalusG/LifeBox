import React from 'react'

const GridComment = (props) => {
    return (
        <>
            <div className="grid_comment_container">
                <div>
                    <img />
                    <div>spacer</div>
                </div>
                <div>
                    <div>{props.gridOwner.email}</div>
                    <div>content</div>
                </div>
            </div>
        </>
    )
}

export default GridComment