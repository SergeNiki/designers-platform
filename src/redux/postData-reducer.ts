import PostService from '../services/PostService';
import UsersService from '../services/UsersService';
import {
  ClearPostDataState,
  IPostDataState,
  PostDataActions,
  PostDataActionTypes,
  PostDataResponse,
  PostDataThunk,
  SetPostData,
  ToggleIsFetching,
  ToggleIsFollowed,
  ToggleLikePost,
  ToggleLikeResponse,
} from '../types/postData';
import { PostsStatus } from '../types/postsList';
import { RequestFollowType } from '../types/profile';
import { addPopup } from './popup-reducer';

let initialState: IPostDataState = {
  id: 0,
  description: '',
  content: [],
  level_suscription: null,
  author: {
    id: 0,
    username: '',
    display_name: '',
    followers_count: 0,
    avatar: '',
    is_followed: false,
  },
  publication_at: null,
  views_count: 0,
  likes_count: 0,
  status: PostsStatus.PUBLISHED,
  is_liked: false,
  isFetching: false,
};
// Reducer
const postDataReducer = (state = initialState, action: PostDataActions) => {
  switch (action.type) {
    case PostDataActionTypes.SET_POST_DATA:
      return { ...state, ...action.payload };
    case PostDataActionTypes.TOGGLE_LIKE_POST:
      return { ...state, ...action.postStatistics };
    case PostDataActionTypes.TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case PostDataActionTypes.TOGGLE_IS_FOLLOWED:
      return {
        ...state,
        author: { ...state.author, is_followed: action.isFollowed },
      };
    case PostDataActionTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
};

// Action Creators
const setPostData = (payload: PostDataResponse): SetPostData => ({
  type: PostDataActionTypes.SET_POST_DATA,
  payload,
});
const toggleLike = (
  postStatistics: ToggleLikeResponse
): ToggleLikePost => ({
  type: PostDataActionTypes.TOGGLE_LIKE_POST,
  postStatistics,
});
const toggleIsFetching = (isFetching: boolean): ToggleIsFetching => ({
  type: PostDataActionTypes.TOGGLE_IS_FETCHING,
  isFetching,
});
const toggleIsFollowed = (isFollowed: boolean): ToggleIsFollowed => ({
  type: PostDataActionTypes.TOGGLE_IS_FOLLOWED,
  isFollowed,
});
export const clearPostDataState = (): ClearPostDataState => ({
  type: PostDataActionTypes.CLEAR_STATE,
});

// Thunk Creators
export const getPostData = (id: number): PostDataThunk => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
      const response = await PostService.getPostData(id);
      dispatch(setPostData(response.data));
      dispatch(toggleIsFetching(false));
    } catch (error) {
      dispatch(addPopup('Что-то пошло не так(', false));
    }
  };
};
export const toggleFollow = (
  user_id: number,
  request_for: RequestFollowType
): PostDataThunk => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
      const response = await UsersService.following(user_id, request_for);
      dispatch(toggleIsFollowed(response.data.is_followed));
      dispatch(toggleIsFetching(false));
    } catch (error) {
      dispatch(addPopup('Что-то пошло не так(', false));
    }
  };
};
export const toggleLikePost = (id: number, isLiked: boolean): PostDataThunk => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
      if (isLiked) {
        var response = await PostService.unlikePost(id);
        dispatch(addPopup('Лайк отменён', true));
      } else {
        var response = await PostService.likePost(id);
        dispatch(addPopup('Лайк поставлен', true));
      }
      dispatch(toggleLike(response.data));
      dispatch(toggleIsFetching(false));
    } catch (error) {
      dispatch(addPopup('Что-то пошло не так(', false));
    }
  };
};

export default postDataReducer;
