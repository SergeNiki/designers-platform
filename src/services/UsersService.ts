import axios, { AxiosResponse } from 'axios';
import $api from '../http';
import { IsFollowedResponse, RequestFollowType } from '../types/profile';
import { FollowUsersRequest, UsersResponse } from '../types/users';

export default class UsersService {
  static async getUsers(
    count: number,
    page: number
  ): Promise<AxiosResponse<UsersResponse>> {
    return $api.get<UsersResponse>(`users/?page=${page}&count=${count}`);
  }

  static async getFollowUsers(
    data: FollowUsersRequest
  ): Promise<AxiosResponse<UsersResponse>> {
    if (data?.next) {
      return axios.get<UsersResponse>(data.next, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
    } else {
      return $api.get<UsersResponse>(
        `users/${data.requestFor}/${data.id}/?count=${
          data.count ? data.count : 10
        }`
      );
    }
  }

  static async following(
    id: number,
    requestFor: RequestFollowType
  ): Promise<AxiosResponse<IsFollowedResponse>> {
    switch (requestFor) {
      case 'isFollowed':
        return $api.get<IsFollowedResponse>(`users/follow/${id}/`);
      case 'follow':
        return $api.post<IsFollowedResponse>(`users/follow/${id}/`);
      case 'unfollow':
        return $api.delete<IsFollowedResponse>(`users/follow/${id}/`);
    }
  }
}
