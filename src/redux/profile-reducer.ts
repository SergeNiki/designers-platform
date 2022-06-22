import ProfileService from "../services/ProfileService";
import UsersService from "../services/UsersService";
import {
  IProfileState,
  ActionsProfileType,
  ActionSetDataType,
  ActionIsFollowedType,
  ProfileDataResponse,
  RequestForType,
  ActionToggleIsFetching,
  ImageFileType,
} from "./../types/profile";

const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_IS_FOLLOWED = "profile/SET_IS_FOLLOWED";
const TOGGLE_IS_FETCHING = "profile/TOGGLE_IS_FETCHING";
const UPDATE_USER_AVATAR = "profile/UPDATE_USER_AVATAR";

let initialState: IProfileState = {
  id: 0,
  username: "",
  display_name: "",
  bio: "",
  followers_count: 0,
  following_count: 0,
  avatar: "",
  is_followed: false,
  social_links: [],
  isFetching: false,
};

const profileReducer = (
  state = initialState,
  action: ActionsProfileType
): IProfileState => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return { ...state, ...action.profileData };
    case SET_IS_FOLLOWED:
      return { ...state, is_followed: action.is_followed };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case UPDATE_USER_AVATAR:
      return { ...state, avatar: action.avatar };
    default:
      return state;
  }
};

export const setUserProfile = (
  profileData: ProfileDataResponse
): ActionSetDataType => ({
  type: SET_USER_PROFILE,
  profileData,
});

export const setIsFollowed = (is_followed: boolean): ActionIsFollowedType => ({
  type: SET_IS_FOLLOWED,
  is_followed,
});

export const toggleIsFetching = (
  isFetching: boolean
): ActionToggleIsFetching => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const setUserAvatar = (avatar: string) => ({
  type: UPDATE_USER_AVATAR,
  avatar,
});

export const getUserProfile = (user_id: number) => {
  return async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    try {
      const response = await ProfileService.getProfileData(user_id);
      dispatch(setUserProfile(response.data));
      dispatch(toggleIsFetching(false));
    } catch (error) {
      console.log(error);
    }
  };
};

export const toggleFollow = (user_id: number, request_for: RequestForType) => {
  return async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    try {
      const response = await UsersService.following(user_id, request_for);
      dispatch(setIsFollowed(response!.data.is_followed));
      dispatch(toggleIsFetching(false));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserAvatar = (imageFile: ImageFileType) => {
  return async (dispatch: any) => {
    try {
      const response = await ProfileService.updateUserAvatar(imageFile);
      dispatch(setUserAvatar(response.data.avatar));
    } catch (error) {
      console.log(error);
    }
  };
};

export default profileReducer;
