import axios, { AxiosResponse } from "axios";
import React from "react";
import $api from "../http";
import { IsFollowedResponse, RequestForType } from "../types/profile";
import { UsersResponse } from "../types/users";

export default class UsersService {
  static async getUsers(
    count: number,
    page: number
  ): Promise<AxiosResponse<UsersResponse>> {
    return $api.get<UsersResponse>(`api/v1/users/?page=${page}&count=${count}`);
  }

  static async getFollowers(user_id: number, next: string | null): Promise<AxiosResponse<UsersResponse>> {
    if (typeof(next) !== 'string') {
      next = `http://31.148.203.10:25566/api/v1/users/followers/${user_id}/`
    }
    return axios.get<UsersResponse>(next, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
  }

  static async getFollowing(user_id: number, next: string | null): Promise<AxiosResponse<UsersResponse>> {
    if (typeof(next) !== 'string') {
      next = `http://31.148.203.10:25566/api/v1/users/following/${user_id}/`
    }
    return axios.get<UsersResponse>(next, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
}
  
  static async following(
    id: number,
    requestFor: RequestForType
  ): Promise<AxiosResponse<IsFollowedResponse>> {
    switch (requestFor) {
      case "is_followed":
        return $api.get<IsFollowedResponse>(`api/v1/users/follow/${id}/`);
      case "follow":
        return $api.post<IsFollowedResponse>(`api/v1/users/follow/${id}/`);
      case "unfollow":
        return $api.delete<IsFollowedResponse>(`api/v1/users/follow/${id}/`);
    }
  }
}
