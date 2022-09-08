import { AxiosResponse } from 'axios';
import $api from '../http';
import {
  ProfileDataResponse,
  UpdateProfileResponse,
  UpdateProfileType,
} from '../types/profile';

export default class ProfileService {
  static async getProfileData(
    id: number
  ): Promise<AxiosResponse<ProfileDataResponse>> {
    return $api.get<ProfileDataResponse>(`users/profile/${id}/`);
  }
  static async updateUserAvatar(
    imageFile: File
  ): Promise<AxiosResponse<{ avatar: string }>> {
    const formData = new FormData();
    formData.append('avatar', imageFile);
    return $api.put<{ avatar: string }>('users/profile/avatar/', formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  }
  static async updateProfileData(
    data: UpdateProfileType
  ): Promise<AxiosResponse<UpdateProfileResponse>> {
    return $api.patch<UpdateProfileResponse>('users/me/profile-settings/', {
      ...data,
    });
  }
}
