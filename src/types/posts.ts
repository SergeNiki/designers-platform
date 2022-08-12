//Previews State
export interface IPostPreviews {
  // count: number;
  // next: string | null;
  // previous: string | null;
  // results: Array<PostData>;
  postPreviewsArray: Array<PreviewDataType>
}
export type PostData = {
  id: number

}
export type PreviewDataType = {
  id: number;
  preview: string;
  likesCount: number;
};
export type PostCreateDataReq = {
  content: Array<PostCreateContentReq>
  preview: File
  description: string
  level_subscription: number
}
export type PostCreateContentReq = {
  file: File
  queue_mark: number
}
export type PostCreateDataRes = Omit<PostCreateDataReq, 'content'>  & {
  id: number
  content: Array<PostCreateContentRes>
  views_count: number
  likes_count: number
  created: string
}
export type PostCreateContentRes = PostCreateContentReq & {
  id: number
  post: number
}


//Previews Action
export type ActionPreviewsType = {
    type: "postPreviews/SET_POST_PREVIEWS";
    postPreviewsArray: Array<PreviewDataType>
}