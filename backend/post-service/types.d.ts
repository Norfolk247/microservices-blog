declare module 'PostTypes' {
    export type Post = {
        id: number,
        body: string,
        author_id: string,
        create_date: Date
    }
}
declare module 'LogtoServiceTypes' {
    export type LogtoUser = {
        sub: string,
        name: string|null,
        picture: unknown,
        updated_at: number,
        username: string,
        created_at: number
    }
    export type LogtoError = {
        code: string,
        message: string,
        error: string,
        error_description: string
    }
}