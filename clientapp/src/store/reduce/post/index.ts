import { IPost } from "../../../models/IPost"
import { PostAction, PostActionEnum, PostState } from "./types"


const initialState: PostState = {
    error: '',
    isLoading: false,
    post: {} as IPost
}

export default function postReducer(state = initialState, action: PostAction): PostState {
    switch (action.type) {
        case PostActionEnum.SET_POST:
            return { ...state, post: action.payload, isLoading: false }
        case PostActionEnum.SET_ERROR:
            return { ...state, error: action.payload, isLoading: false }
        case PostActionEnum.SET_IS_LOADING: {
            return { ...state, isLoading: action.payload, error: '', post:{} as IPost}
        }
        default:
            return state
    }
}