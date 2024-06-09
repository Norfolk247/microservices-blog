declare module 'PostTypes' {
    export type Post = {
        id: number,
        body: string,
        author_id: number,
        create_date: Date
    }
}