import { ThunkAction } from "redux-thunk";
import { StateType } from "../redux/redux-store";

//Profile State
export interface IProfileState {
  id: number;
  username: string;
  display_name: string;
  bio: string;
  followers_count: number;
  following_count: number;
  avatar: string;
  social_links: Array<SocialLinksType>
  
  is_followed: boolean;

  isFetching: boolean;
}
export type SocialLinksType = {
  id: number;
  link: string;
}
export type UpdateProfileType = {
  username: string
  display_name: string
  bio: string
}

// Dispatch Type
export type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionsProfileType>

//Profile Actions 
export enum ProfileActionTypes {
  SET_USER_PROFILE = "profile/SET_USER_PROFILE",
  SET_IS_FOLLOWED = "profile/SET_IS_FOLLOWED",
  TOGGLE_IS_FETCHING = "profile/TOGGLE_IS_FETCHING",
  UPDATE_USER_AVATAR = "profile/UPDATE_USER_AVATAR",
  UPDATE_USER_PROFILE = "profile/UPDATE_USER_PROFILE"
}
export type ActionsProfileType = ActionSetDataType | ActionIsFollowedType | ActionToggleIsFetching | ActionUpdateUserAvatar | ActionUpdateProfile
export type ActionSetDataType = {
  type: ProfileActionTypes.SET_USER_PROFILE
  profileData: ProfileDataResponse;
};
export type ActionIsFollowedType = {
  type: ProfileActionTypes.SET_IS_FOLLOWED
  is_followed: boolean;
}
export type ActionToggleIsFetching = {
  type: ProfileActionTypes.TOGGLE_IS_FETCHING
  isFetching: boolean
}
export type ActionUpdateUserAvatar = {
  type: ProfileActionTypes.UPDATE_USER_AVATAR
  avatar: string
}
export type ActionUpdateProfile = {
  type: ProfileActionTypes.UPDATE_USER_PROFILE
  payload: UpdateProfileResponse
}


//Axios Response
export type ProfileDataResponse = Omit<IProfileState, "is_followed">;
export type IsFollowedResponse = {
  is_followed: boolean;
}
export type RequestFollowType = "isFollowed" | "follow" | "unfollow"
export type UpdateProfileResponse = UpdateProfileType | { id: number }
