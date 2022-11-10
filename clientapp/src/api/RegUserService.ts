import axios, { AxiosResponse } from "axios";
import mem from "mem";
import { IRegUser } from "../models/IRegUser";
import { IUser } from "../models/IUser";
import { axiosWithJwt } from "./api";

const maxAge = 500000;

export default class RegUserService {
    static getRegUsers = mem(async (page?: number, limit?: number): Promise<AxiosResponse<IRegUser[]>> => {
        return axios.get('/api/people', {
            params: { page, limit }
        })
    },
        {
            maxAge,
        }
    )
    static getAuthUser = mem(async (id:number): Promise<AxiosResponse<IUser>> => {
        return axios.get(`/api/people/${id}`)
    },
        {
            maxAge,
        }
    )
    static getRegUsersById = mem(async (id: number): Promise<AxiosResponse<IRegUser>> => {
        return axios.get(`/api/people/${id}`)
    },
        {
            maxAge,
        }
    )
    static async addUser(user: IUser) : Promise<AxiosResponse>{
        return axiosWithJwt.post(`/api/people`, user)
    }
    static async updateUser(user: IUser, id: number) : Promise<AxiosResponse>{
        return axiosWithJwt.put(`/api/people/${id}`, user)
    }
    static async deleteUser(id: number) : Promise<AxiosResponse>{
        return axiosWithJwt.delete(`/api/people/${id}`)
    }
}