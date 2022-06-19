import { AxiosResponse } from "axios";
import $api from "../http";
import { IAuthLoginResponse, IAuthMeResponse, ITelegramUser } from "../types/auth";

export default class AuthService {
  static async login(user: ITelegramUser): Promise<AxiosResponse<IAuthLoginResponse>> {
    return $api.post<IAuthLoginResponse>("api/v1/auth/telegram/", JSON.stringify(user), {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        }
    });
  }
  static async authMe(): Promise<AxiosResponse<IAuthMeResponse>> {
    return $api.get<IAuthMeResponse>("api/v1/auth/me/");
  }
}
