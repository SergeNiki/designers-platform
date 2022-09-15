import { ThunkAction } from 'redux-thunk';
import { StateType } from '../redux/redux-store';
import { SubData } from './subscriptions';
import { UserDataType } from './users';

// PostsList State
export interface IPostListsState {
  waitingPosts: PostsListData | null;
  publishedPosts: PostsListData | null;
  drafts: PostsListData | null;
}
export type PostsListData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<PostPreviewData>;
  isFetching?: boolean;
};
export type PostPreviewData = {
  id: number;
  author: UserDataType;
  preview: string;
  views_count: number;
  likes_count: number;
  level_subscription: Pick<SubData, 'id' | 'name'> | null;
  access: boolean;
};

// Actions
export enum PostListsActionTypes {
  SET_PUBLISHED_POSTS = 'postLists/SET_PUBLISHED_POSTS',
  SET_WAITING_POSTS = 'postLists/SET_WAITING_POSTS',
  SET_DRAFTS = 'postLists/SET_DRAFTS',
  TOGGLE_IS_FETCHING = 'postLists/TOGGLE_IS_FETCHING',
  CLEAR_STATE = 'postLists/CLEAR_STATE',
}
export type SetPosts = {
  type:
    | PostListsActionTypes.SET_PUBLISHED_POSTS
    | PostListsActionTypes.SET_WAITING_POSTS
    | PostListsActionTypes.SET_DRAFTS;
  payload: PostsListDataResponse;
};
export type ClearPostListsState = {
  type: PostListsActionTypes.CLEAR_STATE;
};
export type ToggleIsFetching = {
    type: PostListsActionTypes.TOGGLE_IS_FETCHING,
    isFetching: boolean,
    postsStatus: PostsStatus
}
export type PostListsActions = SetPosts | ClearPostListsState | ToggleIsFetching;

// Thunk
export type PostListsThunk = ThunkAction<
  Promise<void>,
  StateType,
  unknown,
  PostListsActions
>;

// Axios Response
export type PostsListDataResponse = Omit<PostsListData, 'isFetching'>;
//Axios Request
export enum PostsStatus {
    DRAFTS = 'drafts',
    PUBLISHED = 'published',
    WAITING = 'waiting'
}
