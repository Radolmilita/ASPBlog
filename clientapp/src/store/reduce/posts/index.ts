import { IPost } from "../../../models/IPost"
import { PostsAction, PostsActionEnum, PostsState } from "./types"


const initialState: PostsState = {
    error: '',
    isLoading: true,
    posts: [] as IPost[],
    page: 0,
    limit: 5,
    enough: true
}

export default function postsReducer(state = initialState, action: PostsAction): PostsState {
    switch (action.type) {
        case PostsActionEnum.SET_POSTS:
            return { ...state, posts: action.payload, isLoading: false }
        case PostsActionEnum.SET_ERROR:
            return { ...state, error: action.payload, isLoading: false, enough: false }
        case PostsActionEnum.SET_PAGE:
            return { ...state, page: action.payload }
        case PostsActionEnum.SET_IS_ENOUGH:
            return { ...state, enough: action.payload, isLoading: false }
        case PostsActionEnum.SET_START:
            return { ...state, error: '', enough: true }
        default:
            return state
    }
}