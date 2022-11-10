import { IComment } from "../../../models/IComment"

export interface CommentState {
    comment: IComment
    error: string
    isLoading: boolean
}
export enum CommentActionEnum {
    SET_COMMENT = 'SET_COMMENT',
    SET_ERROR = 'SET_COMMENTS_ERROR',
    SET_IS_LOADING = "SET_COMMENT_IS_LOADING"
}
export interface SetErrorAction {
    type: CommentActionEnum.SET_ERROR
    payload: string
}
export interface SetIsLoadingAction {
    type: CommentActionEnum.SET_IS_LOADING
    payload: boolean
}
export interface SetCommentAction{
    type: CommentActionEnum.SET_COMMENT
    payload: IComment
}
export type CommentAction =
    SetErrorAction |
    SetIsLoadingAction |
    SetCommentAction