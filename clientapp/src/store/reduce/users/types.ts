import { IRegUser } from "../../../models/IRegUser"


export interface UsersState {
    users: IRegUser[]
    isLoading: boolean
    error: string
    page: number
    limit: number
    enough: boolean
}

export enum UsersActionEnum {
    SET_ERROR = 'SET_USERS_ERROR',
    SET_USERS = 'SET_USERS',
    SET_PAGE = 'SET_USERS_PAGE',
    SET_IS_ENOUGH = 'SET_USERS_IS_ENOUGH',
    SET_START = "SET_USERS_START"
}

export interface SetErrorAction {
    type: UsersActionEnum.SET_ERROR
    payload: string
}
export interface SetUsersAction {
    type: UsersActionEnum.SET_USERS
    payload: IRegUser[]
}
export interface SetPageAction {
    type: UsersActionEnum.SET_PAGE
    payload: number
}
export interface SetIsEnoughAction {
    type: UsersActionEnum.SET_IS_ENOUGH
    payload: boolean
}
export interface SetStartAction {
    type: UsersActionEnum.SET_START
}
export type UsersAction =
    SetErrorAction |
    SetUsersAction |
    SetPageAction |
    SetIsEnoughAction |
    SetStartAction