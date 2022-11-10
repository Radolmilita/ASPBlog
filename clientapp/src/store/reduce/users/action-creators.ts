import { AppDispatch } from "../.."
import RegUserService from "../../../api/RegUserService"
import { IRegUser } from "../../../models/IRegUser"
import {  SetErrorAction, SetIsEnoughAction, SetPageAction, SetStartAction, SetUsersAction, UsersActionEnum } from "./types"


export const UsersActionCreators = {
    setUsers: (users: IRegUser[]): SetUsersAction => ({ type: UsersActionEnum.SET_USERS, payload: users }),
    setError: (payload: string): SetErrorAction => ({ type: UsersActionEnum.SET_ERROR, payload }),
    setPage: (payload: number): SetPageAction => ({ type: UsersActionEnum.SET_PAGE, payload }),
    setIsEnough: (payload: boolean): SetIsEnoughAction => ({ type: UsersActionEnum.SET_IS_ENOUGH, payload }),
    setStart: (): SetStartAction => ({ type: UsersActionEnum.SET_START }),
    loadUsers: (page?: number, limit?: number, users?: IRegUser[]) => async (dispatch: AppDispatch) => {
        try {
            dispatch(UsersActionCreators.setStart())
            if (page != undefined) {
                dispatch(UsersActionCreators.setPage(++page))
            }
            const response = await RegUserService.getRegUsers(page, limit)
            const mockUsers = response.data
            if (mockUsers.length != 0 && users != undefined) {
                dispatch(UsersActionCreators.setUsers([...users, ...mockUsers]))
            }
            else if (mockUsers.length != 0) {
                dispatch(UsersActionCreators.setUsers(mockUsers))
            }
            if(mockUsers.length < limit!) {
                dispatch(UsersActionCreators.setIsEnough(false))
            }
        }
        catch (e) {
            dispatch(UsersActionCreators.setError((e as Error).message))
        }
    }
}