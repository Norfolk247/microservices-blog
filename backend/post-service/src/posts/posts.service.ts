import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {createPost, getPosts} from './postsTableQueries'

@Injectable()
export class PostsService {
    findPosts(rawPage?: string, rawId?: string, rawAuthorId?: string) {
        // @ts-expect-error: +undefined || right conversion == NaN || right conversion == right conversion
        const [page, id, authorId] = [+rawPage || 1, +rawId || undefined, +rawAuthorId || undefined]
        const postsPerPage = 3
        return getPosts(
            (page - 1) * postsPerPage + 1,
            page * postsPerPage,
            id,
            authorId
        )
    }

    createPost(body: any, authorName: string) {
        if (typeof body != 'string' || body === '') throw new HttpException('Wrong text body argument', HttpStatus.BAD_REQUEST)

        return createPost(body, 1)
    }
}