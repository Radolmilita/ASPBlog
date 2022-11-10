import { IRegUser } from "../../../models/IRegUser"
import { UsersAction, UsersActionEnum, UsersState } from "./types"


const initialState: UsersState = {
    error: '',
    isLoading: true,
    users: [] as IRegUser[],
    page: 0,
    limit: 5,
    enough: true
}

export default function usersReducer(state = initialState, action: UsersAction): UsersState {
    switch (action.type) {
        case UsersActionEnum.SET_USERS:
            return { ...state, users: action.payload, isLoading: false }
        case UsersActionEnum.SET_ERROR:
            return { ...state, error: action.payload, isLoading: false, enough: false }
        case UsersActionEnum.SET_PAGE:
            return { ...state, page: action.payload }
        case UsersActionEnum.SET_START:
            return { ...state, error: '', enough: true }
        case UsersActionEnum.SET_IS_ENOUGH:
            return { ...state, enough: action.payload, isLoading: false }
        default:
            return state
    }
}