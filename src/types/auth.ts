//Auth State
export interface IAuthState {
  user_id: number;
  username: string | null;
  avatar: string | null;
  display_name: string | null;
  isAuth: boolean;
  isProcessLogin: boolean;
}


// Auth Actions
export type ActionsAuthType = ActionSetUserData | ActionToggleIsProcessLogin;
export type ActionToggleIsProcessLogin = {
  type: "auth/TOGGLE_IS_PROCESS_LOGIN";
}
export type ActionSetUserData = {
  type: "auth/SET_USER_DATA";
  payload: IAuthState;
}


//Telegram Data
export interface ITelegramUser {
  auth_date: number;
  id: number;
  first_name?: string;
  last_name?: string;
  hash: string;
  username: string;
  photo_url?: string;
}


//Axios Response
export interface IAuthLoginResponse {
  user_id: number;
  access_token: string;
}
export interface IAuthMeResponse {
  id: number;
  username: string;
  avatar: string;
  display_name: string;
}
