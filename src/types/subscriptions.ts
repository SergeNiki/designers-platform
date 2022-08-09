import { ThunkAction } from 'redux-thunk';
import { StateType } from '../redux/redux-store';

// Subscriptions State
export interface ISubscriptionsState {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<SubData>;
  isFetching: boolean;
  statusMessage: string;
}
export type SubData = {
  id: number;
  owner: number;
  name: string;
  description: string;
  image: string;
  price: string;
  price_currency: string;
  is_subscribed: boolean;
};

export type SubCreateData = Omit<SubData, 'id' | 'owner' | 'is_subscribed' | 'image'> & {
    image: File | null
};
export type SubEditData = {
    name?: string;
    description?: string;
    image?: File;
}

//Dispatch Type
export type ThunkSubType = ThunkAction<
  Promise<void>,
  StateType,
  unknown,
  ActionsSubscriptions
>;

// Subscriptions Actions
export enum SubsActionTypes {
  SET_SUBSCRIPTIONS = 'subscriptions/SET_SUBSCRIPTIONS',
  CREATING_SUBSCRIPTION = 'subscriptions/CREATING_SUBSCRIPTION',
  EDIT_SUBSCRIPTION = 'subscriptions/EDIT_SUBSCRIPTION',
  DELETE_SUBSCRIPTION = 'subscriptions/DELETE_SUBSCRIPTION',
  TOGGLE_IS_FETCHING = 'subscriptions/TOGGLE_IS_FETCHING',
  SET_STATUS_MESSAGE = 'subscriptions/SET_STATUS_MESSAGE',
}
export type ActionGetSubscriptions = {
  type: SubsActionTypes.SET_SUBSCRIPTIONS;
  payload: GetSubscriptionsResponse;
};
export type ActionСreatingSubscription = {
  type: SubsActionTypes.CREATING_SUBSCRIPTION;
  payload: SubData;
};
export type ActionEditSubscription = {
  type: SubsActionTypes.EDIT_SUBSCRIPTION;
  payload: SubData;
};
export type ActionDeleteSubscription = {
  type: SubsActionTypes.DELETE_SUBSCRIPTION;
  id: number;
};
export type ActionToggleIsFetching = {
  type: SubsActionTypes.TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export type ActionSetStatusMessage = {
  type: SubsActionTypes.SET_STATUS_MESSAGE;
  message: string;
};
export type ActionsSubscriptions =
  | ActionGetSubscriptions
  | ActionСreatingSubscription
  | ActionEditSubscription
  | ActionDeleteSubscription
  | ActionToggleIsFetching
  | ActionSetStatusMessage;

// Subscriptions Response
export type GetSubscriptionsResponse = Omit<ISubscriptionsState, 'is_fetching'>;
