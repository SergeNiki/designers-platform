import { ThunkAction } from "redux-thunk"
import { StateType } from "../redux/redux-store"

// Image State
export interface IImageState {
    imageFile: null | File
    coverPreview: string
}

// Dispatch Type
export type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionsImage>

// Image Actions
export enum ImageActionsType {
    SET_IMAGE_FILE = 'image/SET_IMAGE_FILE',
    SET_COVER_PREVIEW = 'image/SET_COVER_PREVIEW',
    CLEAR_STATE = 'image/CLEAR_STATE'
}
export type ActionSetImage = {
    type: ImageActionsType.SET_IMAGE_FILE
    imageFile: File
}
export type ActionSetCoverPreview ={
    type: ImageActionsType.SET_COVER_PREVIEW
    coverPreview: string
}
export type ActionClearImageState = {
    type: ImageActionsType.CLEAR_STATE
}
export type ActionsImage = ActionSetImage | ActionSetCoverPreview | ActionClearImageState