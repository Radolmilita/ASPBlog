import { IComment } from "../../../models/IComment";
import { CommentAction, CommentActionEnum, CommentState } from "./types";


const initialState: CommentState = {
    isLoading: false,
    error: '',
    comment: {} as IComment
}

export default function commentReducer(state = initialState, action: CommentAction): CommentState {
    switch (action.type) {
        case CommentActionEnum.SET_ERROR:
            return { ...state, error: action.payload, isLoading: false }
        case CommentActionEnum.SET_IS_LOADING:
            return { ...state, isLoading: action.payload }
        case CommentActionEnum.SET_COMMENT:
            return {...state, comment: action.payload}
        default:
            return state
    }
}