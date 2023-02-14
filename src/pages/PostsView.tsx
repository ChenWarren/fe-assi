import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// Define the Post interface export it for using in other components
export interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

// Define the PostsView component
const PostsView = () => {
    const [posts, setPosts] = useState<Post[]>([])

    // Use the useEffect hook to fetch the posts list from the API
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
        <>
            <h1>Posts</h1>
            <div>
                {/* Map over the posts array and render a link for each*/}
                { posts.map( post => (
                    <h2 key={post.id}>
                        {/* Use the React Router Dom Link component to create a link to the post detail view */}
                        <Link to={`/post/${post.id}`}>{post.title}</Link> 
                    </h2>
                ))}
            </div>
        </>
    )
}

export default PostsView