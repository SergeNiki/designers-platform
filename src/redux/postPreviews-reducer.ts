import { ActionPreviewsType, IPostPreviews, PreviewDataType } from "../types/posts"

const SET_POST_PREVIEWS = "postPreviews/SET_POST_PREVIEWS"

let initialState: IPostPreviews = {
  postPreviewsArray: [
        { id: 1, preview: 'https://us.v-cdn.net/5021068/uploads/editor/db/u7vmc2nddibb.jpg', likesCount: 0 },
        {
          id: 2,
          preview: 'https://netrinoimages.s3.eu-west-2.amazonaws.com/2021/05/06/833955/348727/low_poly_office_scene_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_3642414_o.png', likesCount: 0
        },
        { id: 3, preview: 'https://us.v-cdn.net/5021068/uploads/editor/dl/pp8q9j8j5i7w.jpg', likesCount: 0 },
        // { id: 4, preview: 'https://us.v-cdn.net/5021068/uploads/editor/db/u7vmc2nddibb.jpg', likesCount: 0 },
        // {
        //   id: 5,
        //   preview: 'https://netrinoimages.s3.eu-west-2.amazonaws.com/2021/05/06/833955/348727/low_poly_office_scene_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_3642414_o.png', likesCount: 0
        // },
        // { id: 4, preview: 'https://us.v-cdn.net/5021068/uploads/editor/db/u7vmc2nddibb.jpg', likesCount: 0 },
        // {
        //   id: 5,
        //   preview: 'https://netrinoimages.s3.eu-west-2.amazonaws.com/2021/05/06/833955/348727/low_poly_office_scene_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_3642414_o.png', likesCount: 0
        // },
        // { id: 1, preview: 'https://us.v-cdn.net/5021068/uploads/editor/db/u7vmc2nddibb.jpg', likesCount: 0 },
        // {
        //   id: 2,
        //   preview: 'https://netrinoimages.s3.eu-west-2.amazonaws.com/2021/05/06/833955/348727/low_poly_office_scene_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_3642414_o.png', likesCount: 0
        // },
        // { id: 3, preview: 'https://us.v-cdn.net/5021068/uploads/editor/dl/pp8q9j8j5i7w.jpg', likesCount: 0 },
        // { id: 4, preview: 'https://us.v-cdn.net/5021068/uploads/editor/db/u7vmc2nddibb.jpg', likesCount: 0 },
        // {
        //   id: 5,
        //   preview: 'https://netrinoimages.s3.eu-west-2.amazonaws.com/2021/05/06/833955/348727/low_poly_office_scene_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_3642414_o.png', likesCount: 0
        // },
        // { id: 4, preview: 'https://us.v-cdn.net/5021068/uploads/editor/db/u7vmc2nddibb.jpg', likesCount: 0 },
        // {
        //   id: 5,
        //   preview: 'https://netrinoimages.s3.eu-west-2.amazonaws.com/2021/05/06/833955/348727/low_poly_office_scene_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_3642414_o.png', likesCount: 0
        // },
    ]
}

const postPreviewsReducer = (state = initialState, action: ActionPreviewsType): IPostPreviews => {
  switch (action.type) {
    case SET_POST_PREVIEWS:
      return {
        ...state, postPreviewsArray: [...action.postPreviewsArray]
      }
    default:
      return state
  }
}

export const setUserProfile = (postPreviewsArray: Array<PreviewDataType>): ActionPreviewsType => ({
  type: SET_POST_PREVIEWS,
  postPreviewsArray,
});

export default postPreviewsReducer