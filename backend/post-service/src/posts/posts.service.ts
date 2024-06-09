import { Injectable } from '@nestjs/common'
import { getPosts } from './databaseQueries/postsTableQueries'

@Injectable()
export class PostsService {
    findPosts(page = 1, id?: number, authorId?: number) {
        const postsPerPage = 3
        return getPosts(
            (page - 1) * postsPerPage + 1,
            page * postsPerPage,
            id,
            authorId
        )
    }
}