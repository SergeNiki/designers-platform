import { AxiosResponse } from 'axios';
import $api from '../http';
import { UpdatePostData, LikePostData, PublishPostData, UpdatePostRequest } from '../types/posts';

export default class PostService {
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
  ): Promise<AxiosResponse<UpdatePostData>> {
    return $api.delete<UpdatePostData>(
      `posts/${postId}/file/${fileId}/`,
    );
  }
  static async likePost(id: number): Promise<AxiosResponse<LikePostData>> {
    return $api.post<LikePostData>(`posts/${id}/like/`);
  }
  static async unlikePost(id: number): Promise<AxiosResponse<LikePostData>> {
    return $api.delete<LikePostData>(`posts/${id}/like/`);
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
}
