import { IPost } from "../../../models/IPost"
import { PostActionEnum } from "../post/types"


export interface PostsState {
    posts: IPost[]
    isLoading: boolean
    error: string
    page: number
    limit: number
    enough: boolean
}

export enum PostsActionEnum {
    SET_ERROR = 'SET_POSTS_ERROR',
    SET_POSTS = 'SET_POSTS',
    SET_IS_LOADING = 'SET_POSTS_IS_LOADING',
    SET_PAGE = 'SET_POSTS_PAGE',
    SET_IS_ENOUGH = 'SET_POSTS_IS_ENOUGH',
    SET_START = 'SET_POSTS_START'
}

export interface SetErrorAction {
    type: PostsActionEnum.SET_ERROR
    payload: string
}
export interface SetPostsAction {
    type: PostsActionEnum.SET_POSTS
    payload: IPost[]
}
export interface SetPageAction {
    type: PostsActionEnum.SET_PAGE
    payload: number
}
export interface SetIsEnoughAction {
    type: PostsActionEnum.SET_IS_ENOUGH
    payload: boolean
}
export interface SetStartAction {
    type: PostsActionEnum.SET_START
}

export type PostsAction =
    SetErrorAction |
    SetPostsAction |
    SetPageAction |
    SetIsEnoughAction |
    SetStartAction