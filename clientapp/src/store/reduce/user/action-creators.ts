import { AppDispatch } from "../.."
import RegUserService from "../../../api/RegUserService"
import { IRegUser } from "../../../models/IRegUser"
import { IUser } from "../../../models/IUser"
import { AuthActionCreators } from "../auth/action-creators"
import { SetAuthUserAction, SetErrorAction, SetIsLoadingAction, SetUserAction, UserActionEnum } from "./types"


export const UserActionCreators = {
    setUser: (user: IRegUser): SetUserAction => ({ type: UserActionEnum.SET_USER, payload: user }),
    setAuthUser: (payload: IUser): SetAuthUserAction=>({type: UserActionEnum.SET_AUTH_USER, payload}),
    setError: (payload: string): SetErrorAction => ({ type: UserActionEnum.SET_ERROR, payload }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: UserActionEnum.SET_IS_LOADING, payload }),
    loadUser: (id: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(UserActionCreators.setIsLoading(true))
            const response = await RegUserService.getRegUsersById(id)
            const mockUser = response.data
            if (mockUser) {
                dispatch(UserActionCreators.setUser(mockUser))
            }
            else {
                dispatch(UserActionCreators.setError("Not Found."))
            }
        }
        catch (e) {
            dispatch(UserActionCreators.setError((e as Error).message))
        }
    },
    loadAuthUser:(id: number)=> async (dispatch: AppDispatch)=>{
        try {
            dispatch(UserActionCreators.setIsLoading(true))
            const response = await RegUserService.getAuthUser(id)
            const mockUser = response.data
            if (mockUser) {
                dispatch(UserActionCreators.setAuthUser(mockUser))
            }
            else {
                dispatch(UserActionCreators.setError("Not Found."))
            }
        }
        catch (e) {
            dispatch(UserActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(UserActionCreators.setIsLoading(false))
        }
    },
    addUser:(user: IUser) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(UserActionCreators.setIsLoading(true))
            await RegUserService.addUser(user)
            dispatch(UserActionCreators.setIsLoading(false))
        }
        catch (e) {
            dispatch(UserActionCreators.setError((e as Error).message))
        }
    },
    updateUser:(user: IUser, id: number) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(UserActionCreators.setIsLoading(true))
            await RegUserService.updateUser(user, id)
            dispatch(UserActionCreators.setIsLoading(false))
        }
        catch (e) {
            dispatch(UserActionCreators.setError((e as Error).message))
        }
    },
    deleteUser:(id: number) => async (dispatch: AppDispatch)=>{
        try{
            dispatch(UserActionCreators.setIsLoading(true))
            await RegUserService.deleteUser(id)
            AuthActionCreators.logout()
            dispatch(UserActionCreators.setIsLoading(false))
        }
        catch (e) {
            dispatch(UserActionCreators.setError((e as Error).message))
        }
    }
}