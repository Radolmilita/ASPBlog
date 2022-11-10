import { IPost } from "../../../models/IPost"

export interface PostState {
    post: IPost
    isLoading: boolean
    error: string
}

export enum PostActionEnum {
    SET_ERROR = 'SET_POST_ERROR',
    SET_POST = 'SET_POST',
    SET_IS_LOADING = 'SET_POST_IS_LOADING'
}

export interface SetErrorAction {
    type: PostActionEnum.SET_ERROR
    payload: string
}
export interface SetPostAction {
    type: PostActionEnum.SET_POST
    payload: IPost
}
export interface SetIsLoading {
    payload: boolean
    type: PostActionEnum.SET_IS_LOADING
}

export type PostAction =
    SetErrorAction |
    SetPostAction |
    SetIsLoading