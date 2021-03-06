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
export type ImageFileType = {
  lastModified: number
  lastModifiedDate: Date
  name: string
  size: number
  type: string
  webkitRelativePath: string
}


//Profile Actions 
export type ActionsProfileType = ActionSetDataType | ActionIsFollowedType | ActionToggleIsFetching | ActionUpdateUserAvatar
export type ActionSetDataType = {
  type: "profile/SET_USER_PROFILE";
  profileData: ProfileDataResponse;
};
export type ActionIsFollowedType = {
  type: "profile/SET_IS_FOLLOWED";
  is_followed: boolean;
}
export type ActionToggleIsFetching = {
  type: "profile/TOGGLE_IS_FETCHING"
  isFetching: boolean
}
export type ActionUpdateUserAvatar = {
  type: "profile/UPDATE_USER_AVATAR"
  avatar: string
}


//Axios Response
export type ProfileDataResponse = Omit<IProfileState, "is_followed">;
export type IsFollowedResponse = {
  is_followed: boolean;
}
export type RequestForType = "is_followed" | "follow" | "unfollow"
