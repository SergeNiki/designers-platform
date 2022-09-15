import PostService from "../services/PostService";
import { IPostListsState, PostListsActions, PostListsThunk, PostListsActionTypes, PostsListDataResponse, SetPosts, ToggleIsFetching, PostsStatus, ClearPostListsState } from "../types/postsList";
import { addPopup } from "./popup-reducer";

let initialState: IPostListsState = {
  publishedPosts: null,
  waitingPosts: null,
  drafts: null,
};
// Reducer
const postListsReducer = (
  state = initialState,
  action: PostListsActions
): IPostListsState => {
  switch (action.type) {
    case PostListsActionTypes.SET_PUBLISHED_POSTS:
      return {
        ...state,
        publishedPosts: action.payload,
      };
      case PostListsActionTypes.SET_WAITING_POSTS:
      return {
        ...state,
        waitingPosts: action.payload,
      };
      case PostListsActionTypes.SET_DRAFTS:
      return {
        ...state,
        drafts: action.payload,
      };
      // case PostListsActionTypes.TOGGLE_IS_FETCHING:
      //   {
      //     let newState = {...state}
      //   switch (action.postsStatus) {
      //     case PostsStatus.PUBLISHED:
      //       newState.publishedPosts.isFetching = action.isFetching
      //   }
      //   return {
      //     ...state
      //   };
      // }
      case PostListsActionTypes.CLEAR_STATE:
        return initialState
    default:
      return state;
  }
};

// Action Creators
export const setPublishedPosts = (
  payload: PostsListDataResponse
): SetPosts => ({
  type: PostListsActionTypes.SET_PUBLISHED_POSTS,
  payload,
});
export const setWaitingPosts = (payload: PostsListDataResponse): SetPosts => ({
  type: PostListsActionTypes.SET_WAITING_POSTS,
  payload
})
export const setDrafts = (payload: PostsListDataResponse): SetPosts => ({
  type: PostListsActionTypes.SET_DRAFTS,
  payload
})
export const toggleIsFetching = (isFetching: boolean, postsStatus: PostsStatus): ToggleIsFetching => ({
  type: PostListsActionTypes.TOGGLE_IS_FETCHING,
  isFetching,
  postsStatus
})
export const clearPostListsState = (): ClearPostListsState => ({
  type: PostListsActionTypes.CLEAR_STATE
})

// Thunk Creators
export const getUserPostsList = (id: number): PostListsThunk => {
  return async (dispatch) => {
    // dispatch(toggleIsFetching(true, PostsStatus.PUBLISHED))
    try {
      const response = await PostService.getUserPosts(id);
      dispatch(setPublishedPosts(response.data))
      // console.log(response.data.results[0].);
      
      // dispatch(toggleIsFetching(false, PostsStatus.PUBLISHED))
    } catch (error) {
      dispatch(addPopup('Что-то пошло не так(', false))
    }
  }
}
export const getAuthPostsList = (status: PostsStatus): PostListsThunk => {
  return async (dispatch) => {
    try {
      const response = await PostService.getAuthUserPosts(status);
      if (status == PostsStatus.PUBLISHED) {
        dispatch(setPublishedPosts(response.data))
      } else if (status == PostsStatus.WAITING) {
        dispatch(setWaitingPosts(response.data))
      } else if (status == PostsStatus.DRAFTS) {
        dispatch(setDrafts(response.data))
      }
    } catch (error) {
      dispatch(addPopup('Что-то пошло не так(', false))
    }
  }
}

export default postListsReducer;
