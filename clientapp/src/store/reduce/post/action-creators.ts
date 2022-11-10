import { AppDispatch } from "../.."
import PostService from "../../../api/PostService"
import { IPost } from "../../../models/IPost"
import { PostActionEnum, SetErrorAction, SetIsLoading, SetPostAction } from "./types"


export const PostActionCreators = {
    setPost: (post: IPost): SetPostAction => ({ type: PostActionEnum.SET_POST, payload: post }),
    setError: (payload: string): SetErrorAction => ({ type: PostActionEnum.SET_ERROR, payload }),
    setIsLoading: (payload: boolean): SetIsLoading => ({ type: PostActionEnum.SET_IS_LOADING, payload }),
    loadPost: (id: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(PostActionCreators.setIsLoading(true))
            const response = await PostService.getPostById(id)
            const mockPost = response.data
            if (mockPost) {
                dispatch(PostActionCreators.setPost(mockPost))
            }
            else {
                dispatch(PostActionCreators.setError("Not found."))
            }
        }
        catch (e) {
            dispatch(PostActionCreators.setError((e as Error).message))
        }
    },
    addPost: (post: IPost) => async (dispatch: AppDispatch) => {
        try {
            dispatch(PostActionCreators.setIsLoading(true))
            await PostService.addPost(post)
            dispatch(PostActionCreators.setIsLoading(false))
        }
        catch (e) {
            dispatch(PostActionCreators.setError((e as Error).message))
        }
    },
    updatePost: (post: IPost, id: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(PostActionCreators.setIsLoading(true))
            await PostService.updatePost(post, id)
            dispatch(PostActionCreators.setIsLoading(false))
        }
        catch (e) {
            dispatch(PostActionCreators.setError((e as Error).message))
        }
    },
    deletePost: (id: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(PostActionCreators.setIsLoading(true))
            await PostService.deletePost(id)
            dispatch(PostActionCreators.setIsLoading(false))
        }
        catch (e) {
            dispatch(PostActionCreators.setError((e as Error).message))
        }
    }
}