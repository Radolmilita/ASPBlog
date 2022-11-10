import { IComment } from "../../../models/IComment"
import { CommentsAction, CommentsActionEnum, CommentsState } from "./types"


const initialState: CommentsState = {
    error: '',
    isLoading: true,
    comments: [] as IComment[],
    page: 0,
    limit: 5,
    enough: true
}

export default function commentsReducer(state = initialState, action: CommentsAction): CommentsState {
    switch (action.type) {
        case CommentsActionEnum.SET_COMMENTS:
            return { ...state, comments: action.payload, isLoading: false }
        case CommentsActionEnum.SET_ERROR:
            return { ...state, error: action.payload, isLoading: false, enough: false }
        case CommentsActionEnum.SET_PAGE:
            return { ...state, page: action.payload }
        case CommentsActionEnum.SET_START:
            return { ...state, error: '', isLoading:true, enough: true }
        case CommentsActionEnum.SET_IS_ENOUGH:
            return { ...state, enough: action.payload, isLoading: false }
        default:
            return state
    }
}