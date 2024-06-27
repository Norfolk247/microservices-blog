import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {InjectClient} from "nest-postgres";
import {Client} from "pg";
import {Post} from "PostTypes";

@Injectable()
export class PostsService {
    constructor(@InjectClient() private readonly client: Client) {
    }
    async findPosts(rawPage?: string, rawId?: string, rawAuthorId?: string): Promise<Post[]> {
        // @ts-expect-error: +undefined || right conversion == NaN || right conversion == right conversion
        const [page, id, authorId] = [+rawPage || 1, +rawId || undefined, rawAuthorId || undefined]

        const postsPerPage = 3
        const from = (page - 1) * postsPerPage + 1
        const to = page * postsPerPage

        let query = 'SELECT * FROM posts '
        let params: (string|number)[] = [to - from + 1, from - 1]
        if (id && authorId) {
            query += 'WHERE id = $3 AND author_id = $4 '
            params = [to - from + 1, from - 1, id, authorId]
        } else if (id) {
            query += 'WHERE id = $3 '
            params = [to - from + 1, from - 1, id]
        } else if (authorId) {
            query += 'WHERE author_id = $3 '
            params = [to - from + 1, from - 1, authorId]
        }
        query += 'ORDER BY create_date DESC LIMIT $1 OFFSET $2'
        const result = await this.client.query(query, params)
        return result.rows
    }
    async createPost(body: any, author_id: string): Promise<number> {
        if (typeof body != 'string' || body === '') throw new HttpException('Wrong text body argument', HttpStatus.BAD_REQUEST)
        const result = await this.client.query(
            'INSERT INTO posts(body, author_id) VALUES($1, $2) RETURNING id',
            [body,author_id]
        )
        return result.rows[0]
    }
    async deletePost(id?: string, author_id?: string): Promise<number> {
        // @ts-expect-error +undefined == NaN == false
        if (isNaN(+id) || isNaN(+author_id)) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
        let result = await this.client.query(
            'SELECT author_id FROM posts WHERE id = $1',
            [id]
        )
        if (!result.rowCount) throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        result = await this.client.query(
            'DELETE FROM posts WHERE id = $1 AND author_id = $2 RETURNING id',
            [id, author_id]
        )
        if (!result.rowCount) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        return result.rows[0]
    }
    async editPost(id?: string, body?: any, author_id?: string): Promise<Post> {
        return {id: 1,body: '1',author_id: '1', create_date: new Date()}
    }
}