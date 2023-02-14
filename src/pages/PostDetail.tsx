import React from 'react'

type PostDetailProps = {
    id: number,
    title: string,
    body: string
}

const PostDetail = ({id, title, body}: PostDetailProps) => {
    return (
        <>
            <h1>{title}</h1>
            <p>{body}</p>
        </>
    )
}

export default PostDetail