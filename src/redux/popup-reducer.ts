import {
  ActionAddPopup,
  ActionRemovePopup,
  ActionsPopupMenu,
  ActionStartTimer,
  IPopupMenuState,
  PopupActionsType,
  ThunkType,
} from '../types/popupMenu';

let initialState: IPopupMenuState = {
  isActive: false,
  popups: [],
};

const popupMenuReducer = (
  state = initialState,
  action: ActionsPopupMenu
): IPopupMenuState => {
  switch (action.type) {
    case PopupActionsType.ADD_POPUP:
      return {
        ...state,
        isActive: true,
        popups: [
          {
            isSuccessful: action.isSuccessful,
            contentMessage: action.contentMessage,
            isTimerStarted: false,
            id: Date.now(),
          },
          ...state.popups,
        ],
      };
    case PopupActionsType.START_TIMER:
      return {
        ...state,
        popups: [
          ...state.popups.map((popup) => {
            if (popup.id == action.id) {
              popup.isTimerStarted = true;
            }
            return popup;
          }),
        ],
      };
    case PopupActionsType.REMOVE_POPUP: {
      const newPops = [...state.popups];
      if (newPops.length > 0) newPops.pop();
      return {
        ...state,
        popups: [...newPops],
      };
    }
    default:
      return state;
  }
};

export const addPopupData = (
  contentMessage: string,
  isSuccessful: boolean
): ActionAddPopup => ({
  type: PopupActionsType.ADD_POPUP,
  contentMessage,
  isSuccessful,
});
export const startTimer = (id: number): ActionStartTimer => ({
  type: PopupActionsType.START_TIMER,
  id,
});
export const removePopup = (): ActionRemovePopup => ({
  type: PopupActionsType.REMOVE_POPUP,
});

export const addPopup = (
  contentMessage: string,
  isSuccessful: boolean
): ThunkType => {
  return async (dispatch) => {
    dispatch(addPopupData(contentMessage, isSuccessful));
  };
};

export default popupMenuReducer;
