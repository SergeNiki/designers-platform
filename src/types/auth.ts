import { ThunkAction } from "redux-thunk";
import { StateType } from "../redux/redux-store";

//Auth State
export interface IAuthState {
  id: number;
  username: string | null;
  avatar: string | null;
  display_name: string | null;
  isAuth: boolean;
  isProcessLogin: boolean;
}

//Dispatch Type
export type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionsAuth>

// Auth Actions
export enum ActionsType {
  TOGGLE_IS_PROCESS_LOGIN = "auth/TOGGLE_IS_PROCESS_LOGIN",
  SET_USER_DATA = "auth/SET_USER_DATA",
  CLEAR_AUTH_STATE = "auth/CLEAR_AUTH_STATE"
}
export type ActionToggleIsProcessLogin = {
  type: ActionsType.TOGGLE_IS_PROCESS_LOGIN;
}
export type ActionSetUserData = {
  type: ActionsType.SET_USER_DATA;
  payload: IAuthState;
}
export type ActionClearAuthState = {
  type: ActionsType.CLEAR_AUTH_STATE
}
export type ActionsAuth = ActionSetUserData | ActionToggleIsProcessLogin | ActionClearAuthState;


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
