import axios, { AxiosResponse } from "axios";
import mem from "mem";
import { IComment } from "../models/IComment";
import { axiosWithJwt } from "./api";

export default class CommentService {
    static async getCommentsByPostId(id: number, page?: number, limit?: number): Promise<AxiosResponse<IComment[]>> {
        return axios.get(`/api/posts/${id}/comments`, { params: { page, limit } })
    }
    static async getCommentsByUserId(id: number, page?: number, limit?: number): Promise<AxiosResponse<IComment[]>> {
        return axios.get(`/api/people/${id}/comments`, { params: { page, limit } })
    }
    static async addComment(comment: IComment, id:number): Promise<AxiosResponse> {
        return axiosWithJwt.post(`/api/posts/${id}/comments`, comment)
    }
    static async updateComment(comment: IComment, postId: number, commentId: number): Promise<AxiosResponse> {
        return axiosWithJwt.put(`/api/posts/${postId}/comments/${commentId}`, comment)
    }
    static async deleteComment(postId: number, commentId: number): Promise<AxiosResponse> {
        return axiosWithJwt.delete(`/api/posts/${postId}/comments/${commentId}`)
    }
}
