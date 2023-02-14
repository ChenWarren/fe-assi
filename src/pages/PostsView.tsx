import { useState, useEffect, useRef } from 'react'
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
    const [renderPosts, setRenderPosts] = useState<Post[]>([])
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const loader = useRef<HTMLDivElement>(null)

    // Use the useEffect hook to fetch the posts list from the API
    useEffect(()=> {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            setPosts(response.data)
            setRenderPosts(response.data.slice(0, 20))
        })
        .catch( error => {
            console.log(error.message)
        })
    }, [])

    // Define the handleObserver function
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
        const target = entities[0]
        if ( target.isIntersecting ) {
            if ( page != 0 && page * 20 > posts.length ) {
                setHasMore(false)
                return
            }
            setRenderPosts(posts.slice(0, (page + 1) * 20))
            setPage(page + 1)
        }
    }


    // Use the useEffect hook to load more posts when the user scrolls to the bottom of the page
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        }

        const observer = new IntersectionObserver(handleObserver, options)

        if ( loader.current ) {
            observer.observe(loader.current)
        }

        return () => {
            if ( loader.current ) {
                observer.disconnect()
            }
        }


    }, [renderPosts])

    return (
        <>
            <h1>Posts</h1>
            <div>
                {/* Map over the posts array and render a link for each*/}
                { renderPosts.map( post => (
                    <h2 key={post.id} ref={loader}>
                        {/* Use the React Router Dom Link component to create a link to the post detail view */}
                        <Link to={`/post/${post.id}`}>{post.title}</Link> 
                    </h2>
                ))}
                {!hasMore && <div>--End--</div>}
            </div>
        </>
    )
}

export default PostsView