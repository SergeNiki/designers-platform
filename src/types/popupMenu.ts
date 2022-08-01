import { ThunkAction } from "redux-thunk"
import { StateType } from "../redux/redux-store"

// Popup State
export interface IPopupMenuState {
    isActive: boolean
    contentMessage: string
    isSuccessful: boolean
}

// Dispatch Type
export type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionsPopupMenu>

// Popup Actions
export enum PopupActionsType {
    SET_POPUP_DATA = "popupMenu/SET_POPUP_DATA",
    CLEAR_POPUP_STATE = "popupMenu/CLEAR_POPUP_STATE"
}
export type ActionSetPopupData = {
    type: PopupActionsType.SET_POPUP_DATA
    contentMessage: string
    isSuccessful: boolean
}
export type ActionClearPopupState = {
    type: PopupActionsType.CLEAR_POPUP_STATE
}
export type ActionsPopupMenu = ActionSetPopupData | ActionClearPopupState
