import { AxiosResponse } from "axios";
import React from "react";
import $api from "../http";
import { IsFollowedResponse, RequestForType } from "../types/profile";
import { UsersResponse } from "../types/users";

export default class UsersService {
  static async getUsers(
    count: number,
    page: number
  ): Promise<AxiosResponse<UsersResponse>> {
    return $api.get<UsersResponse>(`api/v1/users/?page${page}&${count}`);
  }

  static async getFollowers(user_id: number): Promise<AxiosResponse<UsersResponse>> {
      return $api.get<UsersResponse>(`api/v1/users/followers/${user_id}/`);
  }

  static async getFollowing(user_id: number): Promise<AxiosResponse<UsersResponse>> {
    return $api.get<UsersResponse>(`api/v1/users/following/${user_id}/`);
}
  
  static async following(
    id: number,
    request_for: RequestForType
  ): Promise<AxiosResponse<IsFollowedResponse>> {
    switch (request_for) {
      case "is_followed":
        return $api.get<IsFollowedResponse>(`api/v1/users/follow/${id}/`);
      case "follow":
        return $api.post<IsFollowedResponse>(`api/v1/users/follow/${id}/`);
      case "unfollow":
        return $api.delete<IsFollowedResponse>(`api/v1/users/follow/${id}/`);
    }
  }
}
