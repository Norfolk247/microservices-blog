import React, {useEffect} from 'react'
import {useUnit} from "effector-react"
import Post from './components/Post'
import {$posts} from '@effector/posts'
import {Box} from '@mui/material'

const App = () => {
    const posts = useUnit($posts)
    return (
        <Box width='100%'>
            {posts.map(post=><Post key={post.id} post={post}/>)}
        </Box>
    )
}

export default App