import axios, { AxiosError } from "axios";
import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { IToken } from "../../../models/IToken";
import { ILogUser } from "../../../models/ILogUser";
import { AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetAuthUserAction, SetAuthTokenAction } from "./types";
import RegUserService from "../../../api/RegUserService";
import TokenService from "../../../api/TokenService";

export const AuthActionCreators = {
    setUser: (user: ILogUser): SetAuthUserAction => ({ type: AuthActionEnum.SET_USER, payload: user }),
    setIsAuth: (auth: boolean): SetAuthAction => ({ type: AuthActionEnum.SET_AUTH, payload: auth }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: AuthActionEnum.SET_IS_LOADING, payload }),
    setError: (payload: string): SetErrorAction => ({ type: AuthActionEnum.SET_ERROR, payload }),
    setToken: (payload: IToken): SetAuthTokenAction => ({ type: AuthActionEnum.SET_TOKEN, payload }),
    login: (login: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            const response = await UserService.login({ login: login, password: password })
            const token = response.data
            if (token) {
                localStorage.setItem('auth', 'true')
                localStorage.setItem('login', login)
                localStorage.setItem('accessToken', token.accessToken)
                localStorage.setItem('refreshToken', token.refreshToken)
                const users = await RegUserService.getRegUsers()
                const id = users.data.find(t => t.login == login)?.id
                localStorage.setItem('id', id!.toString())
                dispatch(AuthActionCreators.setUser({ login: login, password: password }))
                dispatch(AuthActionCreators.setIsAuth(true))
                dispatch(AuthActionCreators.setToken(token))
            }
            else {
                dispatch(AuthActionCreators.setError("Not found."))
            }
        }
        catch (e) {
            dispatch(AuthActionCreators.setError((e as Error).message))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        try {
            const refreshToken = localStorage.getItem('refreshToken')
            const accessToken = localStorage.getItem('accessToken')
            await TokenService.revokeToken({ accessToken, refreshToken } as IToken)
        }
        catch (e) {
            dispatch(AuthActionCreators.setError((e as Error).message))
        }
        finally{
            localStorage.removeItem('auth')
            localStorage.removeItem('login')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('id')
            dispatch(AuthActionCreators.setUser({} as ILogUser))
            dispatch(AuthActionCreators.setIsAuth(false))
            dispatch(AuthActionCreators.setToken({} as IToken))
        }
    },
    auth: () => (dispatch: AppDispatch) => {
        const auth = localStorage.getItem('auth')
        const login = localStorage.getItem('login')
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (auth && login && accessToken && refreshToken) {
            dispatch(AuthActionCreators.setUser({ login } as ILogUser))
            dispatch(AuthActionCreators.setIsAuth(true))
            dispatch(AuthActionCreators.setToken({ accessToken, refreshToken } as IToken))
        }
    }
}