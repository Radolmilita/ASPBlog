export interface IPost {
    id: number
    personId: number
    title: string
    content: string
    dateCreated: Date
    commentIds: number[]
}