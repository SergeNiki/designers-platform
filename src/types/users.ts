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


//Users Actions
export type ActionsUsers = ActionSetUsersDataType | ActionToggleFollow | ActionToggleIsFetching | ActionUpdateFollowingInProgress | ActionClearState
export type ActionSetUsersDataType = {
    type: "users/SET_USERS_LIST" | "users/SET_FOLLOWERS_LIST" | "users/SET_FOLLOWING_LIST"
    payload: UsersResponse
};
export type ActionToggleFollow = {
    type: "users/SET_IS_FOLLOWED"
    userId: number
}
export type ActionToggleIsFetching = {
    type: "users/TOGGLE_IS_FETCHING"
    isFetching: boolean
}
export type ActionUpdateFollowingInProgress = {
    type: "users/UPDATE_FOLLOWINGS_IN_PROGRESS"
    isFetching: boolean
    userId: number
}
export type ActionClearState = {
    type: "users/CLEAR_STATE"
}


//Axios Response
export type UsersResponse = Omit<IUsersState, "isFetching" | "followingsInProgress" | "usresOnPageCount">