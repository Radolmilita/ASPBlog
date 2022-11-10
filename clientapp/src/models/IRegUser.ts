export interface IRegUser {
    id: number
    login: string
    firstName: string
    lastName: string
    birthDate: Date
    postIds: number[]
    commentIds: number[]
}