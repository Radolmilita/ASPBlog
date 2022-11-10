import { AppDispatch } from "../.."
import CommentService from "../../../api/CommentService"
import { IComment } from "../../../models/IComment"
import { CommentsActionEnum, SetCommentsAction, SetErrorAction, SetIsEnoughAction, SetPageAction, SetStartAction } from "./types"


export const CommentsActionCreators = {
    setComments: (payload: IComment[]): SetCommentsAction => ({ type: CommentsActionEnum.SET_COMMENTS, payload }),
    setError: (payload: string): SetErrorAction => ({ type: CommentsActionEnum.SET_ERROR, payload }),
    setPage: (payload: number): SetPageAction => ({ type: CommentsActionEnum.SET_PAGE, payload }),
    setIsEnough: (payload: boolean): SetIsEnoughAction => ({ type: CommentsActionEnum.SET_IS_ENOUGH, payload }),
    setStart: (): SetStartAction => ({ type: CommentsActionEnum.SET_START }),
    loadCommentsByPostId: (id: number, page?: number, limit?: number, comments?: IComment[]) => async (dispatch: AppDispatch) => {
        try {
            dispatch(CommentsActionCreators.setStart())
            if (page != undefined) {
                dispatch(CommentsActionCreators.setPage(++page))
            }
            const response = await CommentService.getCommentsByPostId(id, page, limit)
            const mockComments = response.data
            if (mockComments.length != 0 && comments != undefined) {
                dispatch(CommentsActionCreators.setComments([...comments, ...mockComments]))
            }
            else if (mockComments.length != 0) {
                dispatch(CommentsActionCreators.setComments(mockComments))
            }
            if(mockComments.length < limit!) {
                dispatch(CommentsActionCreators.setIsEnough(false))
            }
        }
        catch (e) {
            dispatch(CommentsActionCreators.setError((e as Error).message))
        }
    },
    loadCommentsByPersonId: (id: number, page?: number, limit?: number, comments?: IComment[]) => async (dispatch: AppDispatch) => {
        try {
            dispatch(CommentsActionCreators.setStart())
            if (page != undefined) {
                dispatch(CommentsActionCreators.setPage(++page))
            }
            const response = await CommentService.getCommentsByUserId(id, page, limit)
            const mockComments = response.data
            if (mockComments.length != 0 && comments != undefined) {
                dispatch(CommentsActionCreators.setComments([...comments, ...mockComments]))
            }
            else if (mockComments.length != 0) {
                dispatch(CommentsActionCreators.setComments(mockComments))
            }
            if(mockComments.length < limit!) {
                dispatch(CommentsActionCreators.setIsEnough(false))
            }
        }
        catch (e) {
            dispatch(CommentsActionCreators.setError((e as Error).message))
        }
    }
}