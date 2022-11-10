import axios, { AxiosResponse } from "axios";
import { IToken } from "../models/IToken";
import { ILogUser } from "../models/ILogUser";

export default class UserService {
    static async login(user: ILogUser): Promise<AxiosResponse<IToken>> {
        return axios.post<IToken>('/api/auth', user)
    }
}