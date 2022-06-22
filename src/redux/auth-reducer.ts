import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import AuthService from "../services/AuthService";
import { ActionsAuthType, ActionSetUserData, ActionToggleIsProcessLogin, IAuthState, ITelegramUser } from "../types/auth";
import { StateType } from "../types/state";

const SET_USER_DATA = "auth/SET_USER_DATA";
const TOGGLE_IS_PROCESS_LOGIN = "auth/TOGGLE_IS_PROCESS_LOGIN";

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
  action: ActionsAuthType
): IAuthState => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case TOGGLE_IS_PROCESS_LOGIN:
      return {
        ...state,
        isProcessLogin: !state.isProcessLogin
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
  type: SET_USER_DATA,
  payload: { user_id, username, avatar, display_name, isAuth, isProcessLogin },
});

export const toggleIsProcessLogin = (): ActionToggleIsProcessLogin => ({
  type: TOGGLE_IS_PROCESS_LOGIN,
});

type AsyncThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionsAuthType>
type ThunkType = ThunkAction<void, StateType, unknown, ActionsAuthType>

export const onTelegramAuth = (user: ITelegramUser): AsyncThunkType => {
  return async (dispatch) => {
    try {
      const response = await AuthService.login(user);
      localStorage.setItem("token", response.data.access_token);
      dispatch(getAuthUserData());
    } catch (error: any) {
      console.log(error.response.data.detail);
    }
  };
};

export const getAuthUserData = (): AsyncThunkType => {
  return async (dispatch) => {
    try {
      const response = await AuthService.authMe();
      let { id, username, display_name, avatar } = response.data;
      dispatch(
        setAuthUserData(id, username, avatar, display_name, true, false)
      );
    } catch (error: any) {
      dispatch(logout());
    }
  };
};

export const toggleLoginTC = (): ThunkType => {
  return (dispatch) => {
    dispatch(toggleIsProcessLogin());
  };
};

export const logout = (): ThunkType => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(setAuthUserData(0, null, null, null, false, false));
    window.location.reload();
  };
};

export default authReducer;
