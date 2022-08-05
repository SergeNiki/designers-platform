import { ThunkAction } from "redux-thunk"
import { StateType } from "../redux/redux-store"

// Popup State
export interface IPopupMenuState {
    isActive: boolean
    popups: Array<PopupData>
}
export type PopupData = {
    isSuccessful: boolean
    contentMessage: string
    isTimerStarted: boolean
    id: number
}

// Thunk Type
export type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionsPopupMenu>

// Popup Actions
export enum PopupActionsType {
    ADD_POPUP = "popupMenu/ADD_POPUP",
    START_TIMER = "popupMenu/START_TIMER", 
    REMOVE_POPUP = "popupMenu/REMOVE_POPUP",
}
export type ActionAddPopup = {
    type: PopupActionsType.ADD_POPUP
    contentMessage: string
    isSuccessful: boolean
}
export type ActionStartTimer = {
    type: PopupActionsType.START_TIMER
    id: number
}
export type ActionRemovePopup = {
    type: PopupActionsType.REMOVE_POPUP
}
export type ActionsPopupMenu = ActionAddPopup | ActionRemovePopup | ActionStartTimer
