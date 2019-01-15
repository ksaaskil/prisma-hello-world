export interface User {
    id: string
    name: string
    email: string | null
    posts: Post[]
}

export interface Post {
    id: string
    title: string
    published: boolean
    author: User
}