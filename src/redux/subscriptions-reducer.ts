import SubscriptionsService from '../services/SubscriptionsService';
import {
  ActionDeleteSubscription,
  ActionEditSubscription,
  ActionGetSubscriptions,
  ActionSetStatusMessage,
  ActionsSubscriptions,
  ActionToggleIsFetching,
  ActionСreatingSubscription,
  GetSubscriptionsResponse,
  ISubscriptionsState,
  SubCreateData,
  SubData,
  SubEditData,
  SubsActionTypes,
  ThunkSubType,
} from '../types/subscriptions';
import { addPopup } from './popup-reducer';

let initialState: ISubscriptionsState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  isFetching: false,
  statusMessage: '',
};

const subscriptionsReducer = (
  state = initialState,
  action: ActionsSubscriptions
): ISubscriptionsState => {
  switch (action.type) {
    case SubsActionTypes.SET_SUBSCRIPTIONS:
      return { ...state, ...action.payload };
    case SubsActionTypes.CREATING_SUBSCRIPTION:
      return { ...state, results: [...state.results, { ...action.payload }] };
    case SubsActionTypes.EDIT_SUBSCRIPTION:
      return {
        ...state,
        results: state.results.map((sub: SubData) => {
          if (sub.id == action.payload.id) {
            return action.payload;
          }
          return sub;
        }),
      };
    case SubsActionTypes.DELETE_SUBSCRIPTION:
      return {
        ...state,
        results: state.results.filter((sub: SubData) => sub.id !== action.id),
      };
    case SubsActionTypes.TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case SubsActionTypes.SET_STATUS_MESSAGE:
      return { ...state, statusMessage: action.message };
    default:
      return state;
  }
};

export const setSubscriptionsAC = (
  payload: GetSubscriptionsResponse
): ActionGetSubscriptions => ({
  type: SubsActionTypes.SET_SUBSCRIPTIONS,
  payload,
});
export const creatingSubscriptionsAC = (
  payload: SubData
): ActionСreatingSubscription => ({
  type: SubsActionTypes.CREATING_SUBSCRIPTION,
  payload,
});
export const editSubscriptionsAC = (
  payload: SubData
): ActionEditSubscription => ({
  type: SubsActionTypes.EDIT_SUBSCRIPTION,
  payload,
});
export const deleteSubscriptionsAC = (
  id: number
): ActionDeleteSubscription => ({
  type: SubsActionTypes.DELETE_SUBSCRIPTION,
  id,
});
export const toggleIsFetching = (
  isFetching: boolean
): ActionToggleIsFetching => ({
  type: SubsActionTypes.TOGGLE_IS_FETCHING,
  isFetching,
});
export const setStatusMessage = (message: string): ActionSetStatusMessage => ({
  type: SubsActionTypes.SET_STATUS_MESSAGE,
  message,
});

export const getSubscriptions = (userId: number): ThunkSubType => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
      const response = await SubscriptionsService.getSubscriptions(userId);
      dispatch(setSubscriptionsAC(response.data));
      dispatch(toggleIsFetching(false));
    } catch (error) {
      dispatch(addPopup('Что-то пошло не так(', false))
    }
  };
};
export const creatingSubscription = (data: SubCreateData): ThunkSubType => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
      const response = await SubscriptionsService.creatingSubscription(data);
      dispatch(creatingSubscriptionsAC(response.data));
      dispatch(toggleIsFetching(false));
      dispatch(addPopup('Подписка успешно создана!', true));
    } catch (error) {
      dispatch(addPopup('Что-то пошло не так(', false))
    }
  };
};
export const editSubscription = (
  subId: number,
  data: SubEditData
): ThunkSubType => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
      const response = await SubscriptionsService.editSubscription(subId, data);
      dispatch(editSubscriptionsAC(response.data));
      dispatch(toggleIsFetching(false));
      dispatch(addPopup('Подписка успешно отредактирована!', true))
    } catch (error) {
      dispatch(addPopup('Что-то пошло не так(', false))
    }
  };
};
export const deleteSubscription = (subId: number): ThunkSubType => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
      const response = await SubscriptionsService.deleteSubscription(subId);
      dispatch(deleteSubscriptionsAC(subId));
      dispatch(toggleIsFetching(false));
      dispatch(addPopup('Подписка была удалена', false));
    } catch (error) {
      dispatch(addPopup('Что-то пошло не так(', false))
    }
  };
};

export const subscribeOrUnsubscribe = (
  subId: number,
  type: 'sub' | 'unsub'
): ThunkSubType => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
      const response = await SubscriptionsService.subOrUnsub(subId, type);
      dispatch(setStatusMessage(response.data.message));
      dispatch(toggleIsFetching(false));
      if (type == 'sub')
        dispatch(addPopup('Подписка успешно оформлена!', true));
      else if (type == 'unsub')
        dispatch(addPopup('Подписка была отменена!', false));
    } catch (error) {
      dispatch(addPopup('Что-то пошло не так(', false))
    }
  };
};

export default subscriptionsReducer;
