import { AxiosResponse } from 'axios';
import $api from '../http';
import {
  UpdatePostData,
  PublishPostData,
  UpdatePostRequest,
} from '../types/postCreate';
import { PostDataResponse, ToggleLikeResponse } from '../types/postData';
import { PostsListDataResponse, PostsStatus } from '../types/postsList';

export default class PostService {
  // Creating and updating post
  static async createPost(): Promise<AxiosResponse<UpdatePostData>> {
    return $api.post<UpdatePostData>('posts/');
  }
  static async updatePost(
    id: number,
    data: UpdatePostRequest
  ): Promise<AxiosResponse<UpdatePostData>> {
    return $api.patch<UpdatePostData>(`posts/${id}/`, data);
  }
  static async addFileToPost(
    id: number,
    imageFile: File
  ): Promise<AxiosResponse<UpdatePostData>> {
    return $api.post<UpdatePostData>(
      `posts/${id}/file/`,
      { file: imageFile },
      {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      }
    );
  }
  static async removeFileFromPost(
    postId: number,
    fileId: number
  ): Promise<AxiosResponse<void>> {
    return $api.delete<void>(`posts/${postId}/file/${fileId}/`);
  }
  static async publishPost(
    id: number,
    publicationTime?: Date
  ): Promise<AxiosResponse<PublishPostData>> {
    return publicationTime
      ? $api.post<PublishPostData>(`posts/${id}/publish/`, {
          publication_at: publicationTime,
        })
      : $api.post<PublishPostData>(`posts/${id}/publish/`);
  }

  // Get a list of posts
  static async getUserPosts(
    id: number
  ): Promise<AxiosResponse<PostsListDataResponse>> {
    return $api.get<PostsListDataResponse>(`users/${id}/posts/`);
  }
  static async getAuthUserPosts(
    status: PostsStatus
  ): Promise<AxiosResponse<PostsListDataResponse>> {
    return $api.get<PostsListDataResponse>(`users/me/posts/?status=${status}/`);
  }

  // Get post data and like/unlike post
  static async getPostData(
    id: number
  ): Promise<AxiosResponse<PostDataResponse>> {
    return $api.get<PostDataResponse>(`posts/${id}/`);
  }
  static async likePost(id: number): Promise<AxiosResponse<ToggleLikeResponse>> {
    return $api.post<ToggleLikeResponse>(`posts/${id}/like/`);
  }
  static async unlikePost(id: number): Promise<AxiosResponse<ToggleLikeResponse>> {
    return $api.delete<ToggleLikeResponse>(`posts/${id}/like/`);
  }
}
