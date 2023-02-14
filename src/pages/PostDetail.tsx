import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Post } from './PostsView'

// Define the PostDetail component
const PostDetail = () => {
    // Use the useParams hook to get the id parameter from the URL
    const {id} = useParams()
    const [post, setPost] = useState<Post>()

    // Use the useEffect hook to fetch the post detail with the post id from the API
    useEffect(()=> {
        axios.get('https://jsonplaceholder.typicode.com/posts/'+id)
        .then(response => {
            setPost(response.data)
        })
        .catch( error => {
            console.log(error.message)
        })
    }, [])

    return (
        <>
            <h1>{post?.title}</h1>
            <p>{post?.body}</p>
        </>
    )
}

export default PostDetail