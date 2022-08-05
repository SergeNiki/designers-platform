import AuthService from '../services/AuthService';
import {
  ActionClearAuthState,
  ActionsAuth,
  ActionSetUserData,
  ActionsType,
  ActionToggleIsProcessLogin,
  IAuthState,
  ITelegramUser,
  ThunkType,
} from '../types/auth';
import { addPopup } from './popup-reducer';

let initialState: IAuthState = {
  user_id: 0,
  username: null,
  avatar: null,
  display_name: null,
  isAuth: false,
  isProcessLogin: false,
};

const authReducer = (
  state = initialState,
  action: ActionsAuth
): IAuthState => {
  switch (action.type) {
    case ActionsType.SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case ActionsType.TOGGLE_IS_PROCESS_LOGIN:
      return {
        ...state,
        isProcessLogin: !state.isProcessLogin,
      };
    case ActionsType.CLEAR_AUTH_STATE:
      return {
        user_id: 0,
        username: null,
        avatar: null,
        display_name: null,
        isAuth: false,
        isProcessLogin: false,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (
  user_id: number,
  username: string | null,
  avatar: string | null,
  display_name: string | null,
  isAuth: boolean,
  isProcessLogin: boolean
): ActionSetUserData => ({
  type: ActionsType.SET_USER_DATA,
  payload: { user_id, username, avatar, display_name, isAuth, isProcessLogin },
});
export const toggleIsProcessLogin = (): ActionToggleIsProcessLogin => ({
  type: ActionsType.TOGGLE_IS_PROCESS_LOGIN,
});
export const clearAuthState = (): ActionClearAuthState => ({
  type: ActionsType.CLEAR_AUTH_STATE,
});

export const onTelegramAuth = (user: ITelegramUser): ThunkType => {
  return async (dispatch) => {
    try {
      const response = await AuthService.login(user);
      localStorage.setItem('token', response.data.access_token);
      dispatch(getAuthUserData());
      dispatch(addPopup('Вы успешно авторизовались!', true));
    } catch (error: any) {
      console.log(error.response.data.detail);
      dispatch(addPopup('Что-то пошло не так(', false))
    }
  };
};

export const getAuthUserData = (): ThunkType => {
  return async (dispatch) => {
    try {
      const response = await AuthService.authMe();
      let { id, username, display_name, avatar } = response.data;
      dispatch(
        setAuthUserData(id, username, avatar, display_name, true, false)
      );
    } catch (error: any) {
      dispatch(logout());
      dispatch(addPopup('Что-то пошло не так(', false))
    }
  };
};

export const toggleLoginTC = (value?: boolean): ThunkType => {
  return async (dispatch) => {
    dispatch(toggleIsProcessLogin());
  };
};

export const logout = (): ThunkType => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch(clearAuthState());
    window.location.reload();
  };
};

export default authReducer;
