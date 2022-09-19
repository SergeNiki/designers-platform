import { ThunkAction } from 'redux-thunk';
import { StateType } from '../redux/redux-store';
import { PostsStatus } from './postsList';

// PostCreating State
export interface IPostCreateDataState {
  id: number;
  description: string;
  content: Array<ImageFileData>;
  level_subscription: number | null;
  publication_at: Date | null;
  status: PostsStatus
  isFetching: boolean;
}
export type ImageFileData = {
  file: string;
  id: number;
};
export type UpdatePostRequest = {
  description?: string;
  level_subscription?: number | null;
}

// Actions
export enum PostCreatingActionTypes {
  CREATE_POST = 'post/CREATE_POST',
  PUBLISH_POST = 'post/PUBLISH_POST',
  TOGGLE_IS_FETCHING = 'post/TOGGLE_IS_FETCHING',
  CLEAR_STATE = 'post/CLEAR_STATE',
  REMOVE_IMAGE_FILE = 'post/REMOVE_IMAGE_FILE'
}
export type CreateOrUpdatePost = {
  type: PostCreatingActionTypes.CREATE_POST;
  payload: UpdatePostData;
};
export type SetPublicationTime = {
  type: PostCreatingActionTypes.PUBLISH_POST;
  publication_at: Date;
};
export type ToggleIsFetching = {
  type: PostCreatingActionTypes.TOGGLE_IS_FETCHING;
  isFetching: boolean
};
export type ClearPostCreatingState = {
  type: PostCreatingActionTypes.CLEAR_STATE;
};
export type RemoveFileFromPost = {
  type: PostCreatingActionTypes.REMOVE_IMAGE_FILE;
  imageId: number
}
export type PostCreatingActions =
  | CreateOrUpdatePost
  | SetPublicationTime
  | ClearPostCreatingState
  | ToggleIsFetching
  | RemoveFileFromPost;

// Thunk
export type PostCreatingThunk = ThunkAction<
  Promise<void>,
  StateType,
  unknown,
  PostCreatingActions
>;

// Axios Response
export type UpdatePostData = Omit<IPostCreateDataState, 'isFetching'>;
export type PublishPostData = { publication_at: Date };
