import axios, { AxiosResponse } from "axios";
import $api from "../http";
import { IsFollowedResponse, RequestFollowType } from "../types/profile";
import { UsersResponse } from "../types/users";

export default class UsersService {
  static async getUsers(
    count: number,
    page: number
  ): Promise<AxiosResponse<UsersResponse>> {
    return $api.get<UsersResponse>(`users/?page=${page}&count=${count}`);
  }

  static async getFollowers(user_id: number, next: string | null, count: number): Promise<AxiosResponse<UsersResponse>> {
    if (typeof(next) !== 'string') {
      next = `http://31.148.203.10:25566/api/v1/users/followers/${user_id}/?count=${count}`
    }
    return axios.get<UsersResponse>(next, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
  }

  static async getFollowing(user_id: number, next: string | null, count: number): Promise<AxiosResponse<UsersResponse>> {
    if (typeof(next) !== 'string') {
      next = `http://31.148.203.10:25566/api/v1/users/following/${user_id}/?count=${count}`
    }
    return axios.get<UsersResponse>(next, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
}
  
  static async following(
    id: number,
    requestFor: RequestFollowType
  ): Promise<AxiosResponse<IsFollowedResponse>> {
    switch (requestFor) {
      case "isFollowed":
        return $api.get<IsFollowedResponse>(`users/follow/${id}/`);
      case "follow":
        return $api.post<IsFollowedResponse>(`users/follow/${id}/`);
      case "unfollow":
        return $api.delete<IsFollowedResponse>(`users/follow/${id}/`);
    }
  }
}
