import { IComment } from "../../../models/IComment"


export interface CommentsState {
    comments: IComment[]
    isLoading: boolean
    error: string
    page: number
    limit: number
    enough: boolean
}

export enum CommentsActionEnum {
    SET_ERROR = 'SET_COMMENTS_ERROR',
    SET_COMMENTS = 'SET_COMMENTS',
    SET_PAGE = 'SET_COMMENTS_PAGE',
    SET_IS_ENOUGH = 'SET_COMMENTS_IS_ENOUGH',
    SET_START="SET_COMMENTS_START"
}

export interface SetErrorAction {
    type: CommentsActionEnum.SET_ERROR
    payload: string
}
export interface SetCommentsAction {
    type: CommentsActionEnum.SET_COMMENTS
    payload: IComment[]
}
export interface SetPageAction {
    type: CommentsActionEnum.SET_PAGE
    payload: number
}
export interface SetIsEnoughAction {
    type: CommentsActionEnum.SET_IS_ENOUGH
    payload: boolean
}
export interface SetStartAction {
    type: CommentsActionEnum.SET_START
}
export type CommentsAction =
    SetErrorAction |
    SetCommentsAction |
    SetPageAction |
    SetIsEnoughAction |
    SetStartAction