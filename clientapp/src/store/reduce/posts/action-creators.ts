import axios, { AxiosError } from "axios"
import { AppDispatch } from "../.."
import PostService from "../../../api/PostService"
import TokenService from "../../../api/TokenService"
import { IPost } from "../../../models/IPost"
import { IToken } from "../../../models/IToken"
import { AuthActionCreators } from "../auth/action-creators"
import { PostsActionEnum, SetErrorAction, SetIsEnoughAction, SetPageAction, SetPostsAction, SetStartAction } from "./types"


export const PostsActionCreators = {
    setPosts: (posts: IPost[]): SetPostsAction => ({ type: PostsActionEnum.SET_POSTS, payload: posts }),
    setError: (payload: string): SetErrorAction => ({ type: PostsActionEnum.SET_ERROR, payload }),
    setPage: (payload: number): SetPageAction => ({ type: PostsActionEnum.SET_PAGE, payload }),
    setIsEnough: (payload: boolean): SetIsEnoughAction => ({ type: PostsActionEnum.SET_IS_ENOUGH, payload }),
    setStart: (): SetStartAction => ({ type: PostsActionEnum.SET_START }),
    loadPosts: (page?: number, limit?: number, posts?: IPost[]) => async (dispatch: AppDispatch) => {
        try {
            dispatch(PostsActionCreators.setStart())
            if (page != undefined) {
                dispatch(PostsActionCreators.setPage(++page))
            }
            const response = await PostService.getPosts(page, limit)
            const mockPosts = response.data
            if (mockPosts.length != 0 && posts != undefined) {
                dispatch(PostsActionCreators.setPosts([...posts, ...mockPosts]))
            }
            else if (mockPosts.length != 0) {
                dispatch(PostsActionCreators.setPosts(mockPosts))
            }
            if (mockPosts.length < limit!) {
                dispatch(PostsActionCreators.setIsEnough(false))
            }
        }
        catch (e) {
            dispatch(PostsActionCreators.setError((e as Error).message))
        }
    }
}