import PostService from '../services/PostService';
import {
  CreateOrUpdatePost,
  UpdatePostData,
  IPostCreateDataState,
  PostCreatingActions,
  PostCreatingActionTypes,
  ClearPostCreatingState,
  SetPublicationTime,
  ToggleIsFetching,
  PostCreatingThunk,
  UpdatePostRequest,
  RemoveFileFromPost,
} from '../types/postCreate';
import { PostsStatus } from '../types/postsList';
import { addPopup } from './popup-reducer';

let initialState: IPostCreateDataState = {
  id: 0,
  description: '',
  content: [],
  level_subscription: 0,
  publication_at: null,
  status: PostsStatus.PUBLISHED,
  isFetching: false,
};
// Reducer
const postCreateReducer = (
  state = initialState,
  action: PostCreatingActions
): IPostCreateDataState => {
  switch (action.type) {
    case PostCreatingActionTypes.CREATE_POST:
      return { ...state, ...action.payload };
    case PostCreatingActionTypes.PUBLISH_POST:
      return { ...state, publication_at: action.publication_at };
    case PostCreatingActionTypes.TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case PostCreatingActionTypes.REMOVE_IMAGE_FILE:
      return {
        ...state,
        content: state.content.filter((image) => {
          if (image.id !== action.imageId) {
            return image;
          }
        }),
      };
    case PostCreatingActionTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
};

// Action Creators
const createOrUpdatePost = (payload: UpdatePostData): CreateOrUpdatePost => ({
  type: PostCreatingActionTypes.CREATE_POST,
  payload,
});
const setPublicationTime = (publication_at: Date): SetPublicationTime => ({
  type: PostCreatingActionTypes.PUBLISH_POST,
  publication_at,
});
const toggleIsFetching = (isFetching: boolean): ToggleIsFetching => ({
  type: PostCreatingActionTypes.TOGGLE_IS_FETCHING,
  isFetching,
});
export const clearState = (): ClearPostCreatingState => ({
  type: PostCreatingActionTypes.CLEAR_STATE,
});
export const removeFileFromPost = (imageId: number): RemoveFileFromPost => ({
  type: PostCreatingActionTypes.REMOVE_IMAGE_FILE,
  imageId,
});

// Thunk Creators
export const createPost = (): PostCreatingThunk => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
      const response = await PostService.createPost();
      dispatch(createOrUpdatePost(response.data));
      dispatch(toggleIsFetching(false));
    } catch (error) {
      dispatch(addPopup('Что-то пошло не так(', false));
    }
  };
};
export const updatePost = (id: number, data: UpdatePostRequest): PostCreatingThunk => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
      const response = await PostService.updatePost(id, data);
      dispatch(createOrUpdatePost(response.data));
      dispatch(toggleIsFetching(false));
    } catch (error) {
      dispatch(addPopup('Что-то пошло не так(', false));
    }
  };
};
export const addImageFile = (id: number, imageFile: File): PostCreatingThunk => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
      const response = await PostService.addFileToPost(id, imageFile);
      dispatch(createOrUpdatePost(response.data));
      dispatch(toggleIsFetching(false));
    } catch (error) {
      dispatch(addPopup('Что-то пошло не так(', false));
    }
  };
};
export const removeImageFile = (postId: number, imageId: number): PostCreatingThunk => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
      const response = await PostService.removeFileFromPost(postId, imageId);
      dispatch(removeFileFromPost(imageId));
      dispatch(toggleIsFetching(false));
    } catch (error) {
      dispatch(addPopup('Что-то пошло не так(', false));
    }
  };
};
export const publishPost = (id: number, publicationTime?: Date): PostCreatingThunk => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
      const response = await PostService.publishPost(id, publicationTime);
      dispatch(setPublicationTime(response.data.publication_at));
      dispatch(toggleIsFetching(false));
      publicationTime
        ? dispatch(addPopup('Пост ждёт своей публикации!', true))
        : dispatch(addPopup('Пост опубликован!', true));
    } catch (error) {
      dispatch(addPopup('Что-то пошло не так(', false));
    }
  };
};

export default postCreateReducer;
