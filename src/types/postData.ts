import { ThunkAction } from 'redux-thunk';
import { StateType } from '../redux/redux-store';
import { ImageFileData } from './postCreate';
import { PostsStatus } from './postsList';
import { UserDataType } from './users';

// PostData State
export interface IPostDataState {
  id: number;
  description: string;
  content: Array<ImageFileData>;
  level_suscription: number | null;
  author: UserDataType;
  publication_at: Date | null;
  views_count: number;
  likes_count: number;
  status: PostsStatus;
  is_liked: boolean;
  isFetching: boolean;
}

// Actions
export enum PostDataActionTypes {
  SET_POST_DATA = 'postData/SET_POST_DATA',
  TOGGLE_LIKE_POST = 'postData/TOGGLE_LIKE_POST',
  TOGGLE_IS_FETCHING = 'postData/TOGGLE_IS_FETCHING',
  TOGGLE_IS_FOLLOWED = 'postData/TOGGLE_IS_FOLLOWED',
  CLEAR_STATE = 'postData/CLEAR_STATE',
}
export type SetPostData = {
  type: PostDataActionTypes.SET_POST_DATA;
  payload: PostDataResponse;
};
export type ToggleLikePost = {
  type: PostDataActionTypes.TOGGLE_LIKE_POST;
  postStatistics: ToggleLikeResponse;
};
export type ToggleIsFetching = {
  type: PostDataActionTypes.TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export type ClearPostDataState = {
  type: PostDataActionTypes.CLEAR_STATE;
};
export type PostDataActions =
  | SetPostData
  | ToggleLikePost
  | ClearPostDataState
  | ToggleIsFetching;

// Thunk
export type PostDataThunk = ThunkAction<
  Promise<void>,
  StateType,
  unknown,
  PostDataActions
>;

// Axios Response
export type PostDataResponse = Omit<IPostDataState, 'isFetching' | 'is_liked'>;
export type ToggleLikeResponse = Pick<
  IPostDataState,
  'is_liked' | 'likes_count' | 'views_count'
>;
