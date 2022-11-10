import axios, { AxiosResponse } from "axios";
import mem from "mem";
import { IPost } from "../models/IPost";
import { axiosWithJwt } from "./api";

const maxAge = 500000;

export default class PostService {
    static getPosts = mem(async (page?: number, limit?: number): Promise<AxiosResponse<IPost[]>> => {
        return axiosWithJwt.get('/api/posts', { params: { page, limit } })
    },
        {
            maxAge,
        }
    )
    static getPostById = mem(async (id: number): Promise<AxiosResponse<IPost>> => {
        return axios.get(`/api/posts/${id}`)
    },
        {
            maxAge,
        }
    )
    static getPostsByUserId = mem(async (id: number, page?: number, limit?: number): Promise<AxiosResponse<IPost[]>> => {
        return axios.get(`/api/people/${id}/posts`, { params: { page, limit } })
    },
        {
            maxAge,
        }
    )
    static async addPost(post: IPost): Promise<AxiosResponse> {
        return axiosWithJwt.post(`/api/posts`, post)
    }
    static async updatePost(post: IPost, id: number): Promise<AxiosResponse> {
        return axiosWithJwt.put(`/api/posts/${id}`, post)
    }
    static async deletePost(id: number): Promise<AxiosResponse> {
        return axiosWithJwt.delete(`/api/posts/${id}`)
    }
}