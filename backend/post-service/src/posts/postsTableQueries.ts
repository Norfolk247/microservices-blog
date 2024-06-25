import {client} from '../main'
import { Post } from 'PostTypes'

/*const databaseQueryRequestHandler = async <T>(query: string, params: any[]): Promise<T[]> => {
    try {
        return await client.query(query, params).then(res => res.rows)
    } catch (error) {
        console.error(error)
        throw error
    }
}*/

export const getPosts = async (from = 1, to = 10, id?: number, authorId?: number): Promise<Post[]> => {
    try {
        let query = 'SELECT * FROM posts '
        let params = [to - from + 1, from - 1]
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
        return await client.query(query, params).then(res => res.rows)
    } catch (error) {
        throw error
    }
}
export const createPost = (body: string,authorId: number): Promise<number> => client.query(
    'INSERT INTO posts(body, author_id) VALUES($1, $2) RETURNING id',
    [body,authorId]
).then(res=>res.rows[0])