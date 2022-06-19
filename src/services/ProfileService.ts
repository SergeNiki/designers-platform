import { AxiosResponse } from "axios";
import $api from "../http";
import { IsFollowedResponse, ProfileDataResponse, RequestForType } from "../types/profile";

export default class ProfileService {
  static async getProfileData(id: number): Promise<AxiosResponse<ProfileDataResponse>> {
    return $api.get<ProfileDataResponse>(`api/v1/users/profile/${id}/`);
  }
}