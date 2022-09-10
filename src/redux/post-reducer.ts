import PostService from '../services/PostService';
import {
  CreateOrUpdatePost,
  UpdatePostData,
  IPostDataState,
  PostActions,
  PostActionTypes,
  ClearPostState,
  SetPublicationTime,
  ToggleLikePost,
  ToggleIsFetching,
  PostThunk,
  UpdatePostRequest,
  RemoveFileFromPost,
} from '../types/posts';
import { addPopup } from './popup-reducer';

let initialState: IPostDataState = {
  id: 0,
  description: '',
  content: [],
  level_subscription: 0,
  publication_at: null,
  isFetching: false,
  is_liked: false,
};
// Reducer
const postReducer = (
  state = initialState,
  action: PostActions
): IPostDataState => {
  switch (action.type) {
    case PostActionTypes.CREATE_POST:
      return { ...state, ...action.payload };
    case PostActionTypes.TOGGLE_LIKE_POST:
      return { ...state, is_liked: action.is_liked };
    case PostActionTypes.PUBLISH_POST:
      return { ...state, publication_at: action.publication_at };
    case PostActionTypes.TOGGLE_IS_FETCHING:
      return { ...state, isFetching: !state.isFetching };
    case PostActionTypes.REMOVE_IMAGE_FILE:
      return {
        ...state,
        content: state.content.filter((image) => {
          if (image.id !== action.imageId) {
            return image;
          }
        }),
      };
    case PostActionTypes.CLEARE_STATE:
      return initialState;
    default:
      return state;
  }
};

// Action Creators
const createOrUpdatePost = (payload: UpdatePostData): CreateOrUpdatePost => ({
  type: PostActionTypes.CREATE_POST,
  payload,
});
const toggleLike = (is_liked: boolean): ToggleLikePost => ({
  type: PostActionTypes.TOGGLE_LIKE_POST,
  is_liked,
});
const setPublicationTime = (publication_at: Date): SetPublicationTime => ({
  type: PostActionTypes.PUBLISH_POST,
  publication_at,
});
const toggleIsFetching = (isFetching: boolean): ToggleIsFetching => ({
  type: PostActionTypes.TOGGLE_IS_FETCHING,
  isFetching,
});
export const clearState = (): ClearPostState => ({
  type: PostActionTypes.CLEARE_STATE,
});
export const removeFileFromPost = (imageId: number): RemoveFileFromPost => ({
  type: PostActionTypes.REMOVE_IMAGE_FILE,
  imageId,
});

// Thunk Creators
export const createPost = (): PostThunk => {
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
export const updatePost = (id: number, data: UpdatePostRequest): PostThunk => {
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
export const addImageFile = (id: number, imageFile: File): PostThunk => {
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
export const removeImageFile = (postId: number, imageId: number): PostThunk => {
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
export const toggleLikePost = (id: number, isLiked: boolean): PostThunk => {
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
      dispatch(toggleLike(response.data.is_liked));
      dispatch(toggleIsFetching(false));
    } catch (error) {
      dispatch(addPopup('Что-то пошло не так(', false));
    }
  };
};
export const publishPost = (id: number, publicationTime?: Date): PostThunk => {
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

export default postReducer;
