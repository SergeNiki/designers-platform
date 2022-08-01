import { AxiosResponse } from "axios";
import $api from "../http";
import { ProfileDataResponse, UpdateProfileResponse, UpdateProfileType } from "../types/profile";

export default class ProfileService {
  static async getProfileData(id: number): Promise<AxiosResponse<ProfileDataResponse>> {
    return $api.get<ProfileDataResponse>(`api/v1/users/profile/${id}/`);
  }
  static async updateUserAvatar(imageFile: any): Promise<AxiosResponse<{avatar: string}>> {
    const formData = new FormData();
    formData.append("avatar", imageFile)
    return $api.put<{avatar: string}>('api/v1/users/profile/avatar/', formData, {
      headers: {
        'Content-type' : 'multipart/form-data'
      }
    })
  }
  static async updateProfileData(data: UpdateProfileType): Promise<AxiosResponse<UpdateProfileResponse>> {
    return $api.patch<UpdateProfileResponse>('api/v1/users/me/profile-settings/', {...data})
  }
}