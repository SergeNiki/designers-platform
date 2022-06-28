import UsersService from "../services/UsersService";
import { RequestForType } from "../types/profile";
import { ActionClearState, ActionSetUsersDataType, ActionsUsers, ActionToggleFollow, ActionToggleIsFetching, ActionUpdateFollowingInProgress, IUsersState, UsersResponse } from "../types/users";

const SET_USERS_LIST = "users/SET_USERS_LIST"
const SET_FOLLOWERS_LIST = "users/SET_FOLLOWERS_LIST"
const SET_FOLLOWING_LIST = "users/SET_FOLLOWING_LIST"
const SET_IS_FOLLOWED = "users/SET_IS_FOLLOWED"
const TOGGLE_IS_FETCHING = "users/TOGGLE_IS_FETCHING";
const UPDATE_FOLLOWINGS_IN_PROGRESS = "users/UPDATE_FOLLOWINGS_IN_PROGRESS";
const CLEAR_STATE = "users/CLEAR_STATE";

let initialState: IUsersState = {
    count: 0,
    next: null,
    previos: null,
    users: [],
    usresOnPageCount: 10,
    isFetching: false,
    followingsInProgress: [],
}

const usersReducer = (state = initialState, action: ActionsUsers): IUsersState => {
    switch (action.type) {
        case SET_USERS_LIST:
            return {
                ...state, next: action.payload.next, previos: action.payload.previos, users: [...state.users, ...action.payload.users]
            }
        case SET_FOLLOWERS_LIST:
            return {
                ...state, next: action.payload.next, previos: action.payload.previos, users: [...state.users, ...action.payload.users]
            }
        case SET_FOLLOWING_LIST:
            return {
                ...state, next: action.payload.next, previos: action.payload.previos, users: [...state.users, ...action.payload.users]
            }
        case SET_IS_FOLLOWED:
            return {
                ...state,
                users: state.users.map((user) => {
                    if(user.id === action.userId) {
                        return {...user, is_followed: !user.is_followed}
                    }
                    return user;
                })
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case UPDATE_FOLLOWINGS_IN_PROGRESS:
            return {
                ...state,
                followingsInProgress: action.isFetching
                    ? [...state.followingsInProgress, action.userId]
                    : state.followingsInProgress.filter((id) => id !== action.userId)
            }
        case CLEAR_STATE:
            return initialState;
        default: return state
    }
}

export const setUsers = (payload: UsersResponse): ActionSetUsersDataType => ({
    type: SET_USERS_LIST,
    payload
})

export const setFollowers = (payload: UsersResponse): ActionSetUsersDataType => ({
    type: SET_FOLLOWERS_LIST,
    payload
})

export const setFollowing = (payload: UsersResponse): ActionSetUsersDataType => ({
    type: SET_FOLLOWING_LIST,
    payload
})

export const setIsFollowed = (userId: number): ActionToggleFollow => ({
    type: SET_IS_FOLLOWED,
    userId,
});

export const toggleIsFetching = (isFetching: boolean): ActionToggleIsFetching => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
});

export const updateFollowingInProgress = (isFetching: boolean, userId: number): ActionUpdateFollowingInProgress => ({
    type: UPDATE_FOLLOWINGS_IN_PROGRESS,
    isFetching,
    userId,
});

export const clearState = (): ActionClearState => ({
    type: CLEAR_STATE,
});

export const getUsersList = (count: number, page: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        try {
            const response = await UsersService.getUsers(count, page);
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(response.data));
        } catch (error) {
            
        }
    }
}

export const getFollowersList = (user_id: number, next: string | null) => {
    return async (dispatch:any) => {
        dispatch(toggleIsFetching(true))
        try {
            const response = await UsersService.getFollowers(user_id, next);
            dispatch(toggleIsFetching(false))
            dispatch(setFollowers(response.data))
        } catch (error) {
            
        }
    }
}

export const getFollowingList = (user_id: number, next: string | null) => {
    return async (dispatch:any) => {
        dispatch(toggleIsFetching(true))
        try {
            const response = await UsersService.getFollowing(user_id, next);
            dispatch(toggleIsFetching(false))
            dispatch(setFollowing(response.data))
        } catch (error) {
            
        }
    }
}

export const toggleFollow = (user_id: number, request_for: RequestForType) => {
    return async (dispatch: any) => {
        dispatch(updateFollowingInProgress(true, user_id))
      try {
        const response = await UsersService.following(user_id, request_for);
        dispatch(setIsFollowed(user_id))
        dispatch(updateFollowingInProgress(false, user_id))
      } catch (error) {
        console.log(error)
      }
    }
  }

export default usersReducer;