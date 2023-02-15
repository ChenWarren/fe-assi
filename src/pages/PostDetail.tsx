/**
 * This component is used to display the details of a post
 * 
 */

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Post } from './PostsView'
import { Container, Box, Typography, Button, useTheme } from '@mui/material'
import NavigationBar from '../components/NavigationBar'

// Define the PostDetail component
const PostDetail = () => {
    // Use the useParams hook to get the id parameter from the URL
    const {id} = useParams()
    const [post, setPost] = useState<Post>()
    const navigate = useNavigate()
    const theme = useTheme()

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

    // Handle the back button click
    const handleBackClick = () => {
        navigate(-1)
    }


    return (
        <Container sx={{display: 'flex', justifyContent: 'center', mt: 9}}>
            <NavigationBar title='Post Details'/>
            <Box 
                padding={theme.spacing(3)}
                paddingX={theme.breakpoints.up('xs')? theme.spacing(6) : theme.spacing(0)}
            >
                <Typography variant='h4' component='h1' sx={{paddingBottom: 3}}>
                    {post?.title}
                </Typography>
                <Typography variant='body1' component='p'>
                    {post?.body}
                </Typography>

                {/* Back button */}
                <Button sx={{mt: 4}} size='small' variant='outlined' color='primary' onClick={handleBackClick}>Back</Button>

            </Box>
        </Container>
    )
}

export default PostDetail