import ProfileService from "../services/ProfileService";
import UsersService from "../services/UsersService";
import {
  IProfileState,
  ActionsProfileType,
  ActionSetDataType,
  ActionIsFollowedType,
  ProfileDataResponse,
  RequestFollowType,
  ActionToggleIsFetching,
  ImageFileType,
  ThunkType,
  UpdateProfileType,
  UpdateProfileResponse,
  ActionUpdateUserAvatar,
  ProfileActionTypes,
  ActionUpdateProfile,
} from "./../types/profile";

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
    case ProfileActionTypes.SET_USER_PROFILE:
      return { ...state, ...action.profileData };
    case ProfileActionTypes.SET_IS_FOLLOWED:
      return { ...state, is_followed: action.is_followed };
    case ProfileActionTypes.TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case ProfileActionTypes.UPDATE_USER_AVATAR:
      return { ...state, avatar: action.avatar };
    case ProfileActionTypes.UPDATE_USER_PROFILE:
      return {...state, ...action.payload}
    default:
      return state;
  }
};

export const setUserProfile = (
  profileData: ProfileDataResponse
): ActionSetDataType => ({
  type: ProfileActionTypes.SET_USER_PROFILE,
  profileData,
});
export const setIsFollowed = (is_followed: boolean): ActionIsFollowedType => ({
  type: ProfileActionTypes.SET_IS_FOLLOWED,
  is_followed,
});
export const toggleIsFetching = (
  isFetching: boolean
): ActionToggleIsFetching => ({
  type: ProfileActionTypes.TOGGLE_IS_FETCHING,
  isFetching,
});
export const setUserAvatar = (avatar: string): ActionUpdateUserAvatar => ({
  type: ProfileActionTypes.UPDATE_USER_AVATAR,
  avatar,
});
export const updateProfile = (payload: UpdateProfileResponse): ActionUpdateProfile => ({
  type: ProfileActionTypes.UPDATE_USER_PROFILE,
  payload
})

export const getUserProfile = (user_id: number): ThunkType => {
  return async (dispatch) => {
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

export const toggleFollow = (user_id: number, request_for: RequestFollowType): ThunkType => {
  return async (dispatch) => {
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

export const updateUserAvatar = (imageFile: ImageFileType): ThunkType => {
  return async (dispatch: any) => {
    dispatch(toggleIsFetching(true))
    try {
      const response = await ProfileService.updateUserAvatar(imageFile);
      dispatch(setUserAvatar(response.data.avatar));
      dispatch(toggleIsFetching(false))
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProfileData = (data: UpdateProfileType): ThunkType => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true))
    try {
      const response = await ProfileService.updateProfileData(data)
      dispatch(updateProfile(response.data))
      dispatch(toggleIsFetching(false))
    } catch (error) {
      console.log(error);
    }
  }
}

export default profileReducer;
