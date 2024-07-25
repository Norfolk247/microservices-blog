import {createStore} from "effector"

const mockPost1: Post = {
    id: 10,
    body: '123',
    create_date: new Date(),
    author_id: 'sadf'
}
const mockPost2: Post = {
    id: 11,
    body: '<div><b>asd</b></div>',
    create_date: new Date(),
    author_id: 'sadf'
}

export const $posts = createStore<Post[]>([mockPost1,mockPost2])