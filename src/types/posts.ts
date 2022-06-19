//Previews State
export interface IPostPreviews {
    postPreviewsArray: Array<PreviewDataType>
}
export type PreviewDataType = {
  id: number;
  preview: string;
  likesCount: number;
};


//Previews Action
export type ActionPreviewsType = {
    type: "postPreviews/SET_POST_PREVIEWS";
    postPreviewsArray: Array<PreviewDataType>
}