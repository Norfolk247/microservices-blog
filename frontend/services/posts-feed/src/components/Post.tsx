import React from 'react'
import DOMPurify from 'dompurify'
import {Card, CardContent, Typography} from '@mui/material'

const Post = ({post}: { post: Post }) => {
    const {body, create_date, author_id} = post
    const formattedDate = create_date.toLocaleDateString('ru-RU',{
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
    const cleanHtml = DOMPurify.sanitize(body)
    return (
        <Card style={{position: 'relative', padding: '16px', marginBottom: '16px'}}>
            <Typography
                variant="subtitle2"
                color="textSecondary"
                style={{position: 'absolute', top: '16px', left: '16px'}}
            >
                {formattedDate}
            </Typography>
            <CardContent>
                <div dangerouslySetInnerHTML={{__html: cleanHtml}}/>
            </CardContent>
        </Card>
    )
}

export default Post