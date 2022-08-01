import UsersService from '../services/UsersService';
import { RequestFollowType } from '../types/profile';
import {
  ActionClearState,
  ActionSetUsersDataType,
  ActionsUsers,
  ActionToggleFollow,
  ActionToggleIsFetching,
  ActionUpdateFollowingInProgress,
  IUsersState,
  ThunkType,
  UsersActionTypes,
  UsersResponse,
} from '../types/users';

let initialState: IUsersState = {
  count: 0,
  next: null,
  previos: null,
  users: [],
  usresOnPageCount: 10,
  isFetching: false,
  followingsInProgress: [],
};

const usersReducer = (
  state = initialState,
  action: ActionsUsers
): IUsersState => {
  switch (action.type) {
    case UsersActionTypes.SET_USERS_LIST:
      return {
        ...state,
        next: action.payload.next,
        previos: action.payload.previos,
        users: [...state.users, ...action.payload.users],
      };
    case UsersActionTypes.SET_IS_FOLLOWED:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, is_followed: !user.is_followed };
          }
          return user;
        }),
      };
    case UsersActionTypes.TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case UsersActionTypes.UPDATE_FOLLOWINGS_IN_PROGRESS:
      return {
        ...state,
        followingsInProgress: action.isFetching
          ? [...state.followingsInProgress, action.userId]
          : state.followingsInProgress.filter((id) => id !== action.userId),
      };
    case UsersActionTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
};

export const setUsers = (payload: UsersResponse): ActionSetUsersDataType => ({
  type: UsersActionTypes.SET_USERS_LIST,
  payload,
});

export const setIsFollowed = (userId: number): ActionToggleFollow => ({
  type: UsersActionTypes.SET_IS_FOLLOWED,
  userId,
});

export const toggleIsFetching = (
  isFetching: boolean
): ActionToggleIsFetching => ({
  type: UsersActionTypes.TOGGLE_IS_FETCHING,
  isFetching,
});

export const updateFollowingInProgress = (
  isFetching: boolean,
  userId: number
): ActionUpdateFollowingInProgress => ({
  type: UsersActionTypes.UPDATE_FOLLOWINGS_IN_PROGRESS,
  isFetching,
  userId,
});

export const clearState = (): ActionClearState => ({
  type: UsersActionTypes.CLEAR_STATE,
});

export const getUsersList = (count: number, page: number): ThunkType => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
      const response = await UsersService.getUsers(count, page);
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(response.data));
    } catch (error) {}
  };
};

export const getFollowersList = (
  user_id: number,
  next: string | null,
  count: number = 10
): ThunkType => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
      const response = await UsersService.getFollowers(user_id, next, count);
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(response.data));
    } catch (error) {}
  };
};

export const getFollowingList = (
  user_id: number,
  next: string | null,
  count: number = 10
): ThunkType => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
      const response = await UsersService.getFollowing(user_id, next, count);
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(response.data));
    } catch (error) {}
  };
};

export const toggleFollow = (
  user_id: number,
  request_for: RequestFollowType
): ThunkType => {
  return async (dispatch) => {
    dispatch(updateFollowingInProgress(true, user_id));
    try {
      const response = await UsersService.following(user_id, request_for);
      dispatch(setIsFollowed(user_id));
      dispatch(updateFollowingInProgress(false, user_id));
    } catch (error) {
      console.log(error);
    }
  };
};

export default usersReducer;
