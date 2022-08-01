import { ThunkAction } from "redux-thunk";
import { StateType } from "../redux/redux-store";

//Users State
export interface IUsersState {
    usresOnPageCount: number;
    isFetching: boolean;
    followingsInProgress: Array<number>;
    
    //From Response
    count: number;
    next: string | null;
    previos: string | null;
    users: Array<UserDataType>
}
export type UserDataType = {
    id: number;
    username: string;
    display_name: string;
    followers_count: number;
    avatar: string;
    is_followed: boolean;
}

// Dispatch Type
export type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionsUsers>

//Users Actions
export enum UsersActionTypes {
    SET_USERS_LIST = "users/SET_USERS_LIST",
    SET_IS_FOLLOWED = "users/SET_IS_FOLLOWED",
    TOGGLE_IS_FETCHING = "users/TOGGLE_IS_FETCHING",
    UPDATE_FOLLOWINGS_IN_PROGRESS = "users/UPDATE_FOLLOWINGS_IN_PROGRESS",
    CLEAR_STATE = "users/CLEAR_STATE",
}
export type ActionsUsers = ActionSetUsersDataType | ActionToggleFollow | ActionToggleIsFetching | ActionUpdateFollowingInProgress | ActionClearState
export type ActionSetUsersDataType = {
    type: UsersActionTypes.SET_USERS_LIST
    payload: UsersResponse
};
export type ActionToggleFollow = {
    type: UsersActionTypes.SET_IS_FOLLOWED
    userId: number
}
export type ActionToggleIsFetching = {
    type: UsersActionTypes.TOGGLE_IS_FETCHING
    isFetching: boolean
}
export type ActionUpdateFollowingInProgress = {
    type: UsersActionTypes.UPDATE_FOLLOWINGS_IN_PROGRESS
    isFetching: boolean
    userId: number
}
export type ActionClearState = {
    type: UsersActionTypes.CLEAR_STATE
}


//Axios Response
export type UsersResponse = Omit<IUsersState, "isFetching" | "followingsInProgress" | "usresOnPageCount">