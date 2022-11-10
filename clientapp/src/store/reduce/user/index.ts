import { IRegUser } from "../../../models/IRegUser"
import { IUser } from "../../../models/IUser"
import { UserAction, UserActionEnum, UserState } from "./types"

const initialState: UserState = {
    error: '',
    isLoading: false,
    user: {} as IRegUser,
    authUser: {} as IUser
}

export default function userReducer(state = initialState, action: UserAction): UserState {
    switch (action.type) {
        case UserActionEnum.SET_USER:
            return { ...state, user: action.payload, isLoading: false }
        case UserActionEnum.SET_ERROR:
            return { ...state, error: action.payload, isLoading: false }
        case UserActionEnum.SET_IS_LOADING:
            return { ...state, isLoading: action.payload, error: '' }
        case UserActionEnum.SET_AUTH_USER:
            return {...state, authUser: action.payload}
        default:
            return state
    }
}