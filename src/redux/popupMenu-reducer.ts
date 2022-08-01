import {
  ActionClearPopupState,
  ActionSetPopupData,
  ActionsPopupMenu,
  IPopupMenuState,
  PopupActionsType,
  ThunkType,
} from '../types/popupMenu';

let initialState: IPopupMenuState = {
  isActive: false,
  contentMessage: '',
  isSuccessful: false,
};

const PopupMenuReducer = (
  state = initialState,
  action: ActionsPopupMenu
): IPopupMenuState => {
  switch (action.type) {
    case PopupActionsType.SET_POPUP_DATA:
      return {
        ...state,
        isActive: true,
        contentMessage: action.contentMessage,
        isSuccessful: action.isSuccessful,
      };
    case PopupActionsType.CLEAR_POPUP_STATE:
      return { ...state, isActive: false, contentMessage: '' };
    default:
      return state;
  }
};

export const setPopupData = (
  contentMessage: string,
  isSuccessful: boolean
): ActionSetPopupData => ({
  type: PopupActionsType.SET_POPUP_DATA,
  contentMessage,
  isSuccessful,
});

export const clearPopupState = (): ActionClearPopupState => ({
  type: PopupActionsType.CLEAR_POPUP_STATE,
});

export const openPopupMenu = (
  contentMessage: string,
  isSuccessful: boolean
): ThunkType => {
  return async (dispatch) => {
    dispatch(setPopupData(contentMessage, isSuccessful));
  };
};
export const closePopupMenu = (): ThunkType => {
  return async (dispatch) => {
    dispatch(clearPopupState());
  };
};

export default PopupMenuReducer;
