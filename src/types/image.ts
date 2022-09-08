import { ThunkAction } from "redux-thunk"
import { StateType } from "../redux/redux-store"

// Image State
export interface IImageState {
    imageFile: File
    imagePreview: string
}

// Thunk Type
export type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ImageActions>

// Actions
export enum ImageActionTypes {
    SET_IMAGE_FILE = 'image/SET_IMAGE_FILE',
    SET_IMAGE_PREVIEW = 'image/SET_IMAGE_PREVIEW',
    CLEAR_STATE = 'image/CLEAR_STATE'
}
export type SetImageFile = {
    type: ImageActionTypes.SET_IMAGE_FILE
    imageFile: File
}
export type SetImagePreview ={
    type: ImageActionTypes.SET_IMAGE_PREVIEW
    imagePreview: string
}
export type ClearImageState = {
    type: ImageActionTypes.CLEAR_STATE
}
export type ImageActions = SetImageFile | SetImagePreview | ClearImageState