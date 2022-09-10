import { ThunkAction } from 'redux-thunk';
import { StateType } from '../redux/redux-store';

//Previews State
export interface IPostPreviews {
  // count: number;
  // next: string | null;
  // previous: string | null;
  // results: Array<PostData>;
  postPreviewsArray: Array<PreviewDataType>;
}
// Post State
export interface IPostDataState {
  id: number;
  description: string;
  content: Array<ImageFileData>;
  level_subscription: number;
  publication_at: Date | null;
  isFetching: boolean;
  is_liked: boolean;
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
export enum PostActionTypes {
  CREATE_POST = 'post/CREATE_POST',
  TOGGLE_LIKE_POST = 'post/TOGGLE_LIKE_POST',
  PUBLISH_POST = 'post/PUBLISH_POST',
  TOGGLE_IS_FETCHING = 'post/TOGGLE_IS_FETCHING',
  CLEARE_STATE = 'post/CLEARE_STATE',
  REMOVE_IMAGE_FILE = 'post/REMOVE_IMAGE_FILE'
}
export type CreateOrUpdatePost = {
  type: PostActionTypes.CREATE_POST;
  payload: UpdatePostData;
};
export type ToggleLikePost = {
  type: PostActionTypes.TOGGLE_LIKE_POST;
  is_liked: boolean;
};
export type SetPublicationTime = {
  type: PostActionTypes.PUBLISH_POST;
  publication_at: Date;
};
export type ToggleIsFetching = {
  type: PostActionTypes.TOGGLE_IS_FETCHING;
  isFetching: boolean
};
export type ClearPostState = {
  type: PostActionTypes.CLEARE_STATE;
};
export type RemoveFileFromPost = {
  type: PostActionTypes.REMOVE_IMAGE_FILE;
  imageId: number
}
export type PostActions =
  | CreateOrUpdatePost
  | ToggleLikePost
  | SetPublicationTime
  | ClearPostState
  | ToggleIsFetching
  | RemoveFileFromPost;

// Thunk
export type PostThunk = ThunkAction<
  Promise<void>,
  StateType,
  unknown,
  PostActions
>;

// Axios Response
export type UpdatePostData = Omit<IPostDataState, 'isFetching' | 'is_liked'>;
export type LikePostData = { is_liked: boolean };
export type PublishPostData = { publication_at: Date };



export type PreviewDataType = {
  id: number;
  preview: string;
  likesCount: number;
};
export type PostCreateDataReq = {
  content: Array<PostCreateContentReq>;
  preview: File;
  description: string;
  level_subscription: number;
};
export type PostCreateContentReq = {
  file: File;
  queue_mark: number;
};
export type PostCreateDataRes = Omit<PostCreateDataReq, 'content'> & {
  id: number;
  content: Array<PostCreateContentRes>;
  views_count: number;
  likes_count: number;
  created: string;
};
export type PostCreateContentRes = PostCreateContentReq & {
  id: number;
  post: number;
};

//Previews Action
export type ActionPreviewsType = {
  type: 'postPreviews/SET_POST_PREVIEWS';
  postPreviewsArray: Array<PreviewDataType>;
};
