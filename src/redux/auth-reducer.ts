import AuthService from '../services/AuthService';
import {
  ActionClearAuthState,
  ActionsAuth,
  ActionSetUserData,
  ActionsType,
  ActionToggleIsProcessLogin,
  ActionUpdateUserAvatar,
  IAuthMeResponse,
  IAuthState,
  ITelegramUser,
  ThunkType,
} from '../types/auth';
import { addPopup } from './popup-reducer';

let initialState: IAuthState = {
  id: 0,
  username: null,
  avatar: null,
  display_name: null,
  isAuth: false,
  isProcessLogin: false,
};

const authReducer = (state = initialState, action: ActionsAuth): IAuthState => {
  switch (action.type) {
    case ActionsType.SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isProcessLogin: false,
      };
    case ActionsType.TOGGLE_IS_PROCESS_LOGIN:
      return {
        ...state,
        isProcessLogin: !state.isProcessLogin,
      };
    case ActionsType.UPDATE_USER_AVATAR:
      return { ...state, avatar: action.avatar };
    case ActionsType.CLEAR_AUTH_STATE:
      return initialState;
    default:
      return state;
  }
};

//action creators
export const setAuthUserData = (
  payload: IAuthMeResponse
): ActionSetUserData => ({
  type: ActionsType.SET_USER_DATA,
  payload: payload,
});
export const updateAuthAvatar = (avatar: string): ActionUpdateUserAvatar => ({
  type: ActionsType.UPDATE_USER_AVATAR,
  avatar: avatar,
});
export const toggleIsProcessLogin = (): ActionToggleIsProcessLogin => ({
  type: ActionsType.TOGGLE_IS_PROCESS_LOGIN,
});
export const clearAuthState = (): ActionClearAuthState => ({
  type: ActionsType.CLEAR_AUTH_STATE,
});

// thunk action creators
export const onTelegramAuth = (user: ITelegramUser): ThunkType => {
  return async (dispatch) => {
    try {
      const response = await AuthService.login(user);
      localStorage.setItem('token', response.data.access_token);
      dispatch(getAuthUserData());
      dispatch(addPopup('Вы успешно авторизовались!', true));
    } catch (error: any) {
      console.log(error.response.data.detail);
      dispatch(addPopup('Что-то пошло не так(', false));
    }
  };
};

export const getAuthUserData = (): ThunkType => {
  return async (dispatch) => {
    try {
      const response = await AuthService.authMe();
      dispatch(setAuthUserData(response.data));
    } catch (error: any) {
      dispatch(logout());
      dispatch(addPopup('Что-то пошло не так(', false));
    }
  };
};

export const toggleLoginTC = (): ThunkType => {
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
