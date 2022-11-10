import { AppDispatch } from "../..";
import CommentService from "../../../api/CommentService";
import { IComment } from "../../../models/IComment";
import { CommentActionEnum, SetCommentAction, SetErrorAction, SetIsLoadingAction } from "./types";


export const CommentActionCreators = {
    setComment: (payload:IComment):SetCommentAction=>({type: CommentActionEnum.SET_COMMENT,payload}),
    setError: (payload: string): SetErrorAction => ({ type: CommentActionEnum.SET_ERROR, payload }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: CommentActionEnum.SET_IS_LOADING, payload }),
    loadComment: (userId:number, commentId: number)=>async (dispatch:AppDispatch)=>{
        try{
            dispatch(CommentActionCreators.setIsLoading(true))
            dispatch(CommentActionCreators.setComment({} as IComment))
            const response = await CommentService.getCommentsByUserId(userId)
            const comment = response.data.find(t=>t.id==commentId)
            if(comment){
                dispatch(CommentActionCreators.setComment(comment))
                dispatch(CommentActionCreators.setIsLoading(false))
            }
            else{
                dispatch(CommentActionCreators.setError("Not found"))
            }
        }
        catch(e){
            dispatch(CommentActionCreators.setError((e as Error).message))
        }
    },
    addComment: (comment: IComment, id: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(CommentActionCreators.setIsLoading(true))
            await CommentService.addComment(comment, id)
            dispatch(CommentActionCreators.setIsLoading(false))
        }
        catch (e) {
            dispatch(CommentActionCreators.setError((e as Error).message))
        }
    },
    updateComment: (comment: IComment, postId: number, commentId: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(CommentActionCreators.setIsLoading(true))
            await CommentService.updateComment(comment, postId, commentId)
            dispatch(CommentActionCreators.setIsLoading(false))
        }
        catch (e) {
            dispatch(CommentActionCreators.setError((e as Error).message))
        }
    },
    deleteComment: (postId: number, commentId: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(CommentActionCreators.setIsLoading(true))
            await CommentService.deleteComment(postId, commentId)
            dispatch(CommentActionCreators.setIsLoading(false))
        }
        catch (e) {
            dispatch(CommentActionCreators.setError((e as Error).message))
        }
    }
}