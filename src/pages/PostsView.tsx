import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

const PostsView = () => {
    const [posts, setPosts] = React.useState<Post[]>([])

    useEffect(()=> {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            setPosts(response.data)
        })
        .catch( error => {
            console.log(error.message)
        })
    }, [])

    return (
        <div>
            { posts.map( post => (
                <h2 key={post.id}>
                    <Link to={`/post/${post.id}`}>{post.title}</Link> 
                </h2>
            ))}
        </div>
    )
}

export default PostsView