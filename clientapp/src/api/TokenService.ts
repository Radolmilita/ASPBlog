import axios, { AxiosResponse } from "axios";
import mem from "mem";
import { IToken } from "../models/IToken";
import { axiosWithJwt } from "./api";

export default class TokenService {
    static refreshToken = async (token: IToken): Promise<AxiosResponse<IToken>> => {
        return axios.post(`/api/tokens/refresh`, token)
    }
    static async revokeToken(token: IToken): Promise<AxiosResponse> {
        return axiosWithJwt.post(`/api/tokens/revoke`, token)
    }
}