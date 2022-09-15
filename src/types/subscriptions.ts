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
  SET_SUBSCRIPTION_DATA = 'subscriptions/SET_SUBSCRIPTION_DATA'
}
export type SetSubscriptions = {
  type: SubsActionTypes.SET_SUBSCRIPTIONS;
  payload: GetSubscriptionsResponse;
};
export type СreatingSubscription = {
  type: SubsActionTypes.CREATING_SUBSCRIPTION;
  payload: SubData;
};
export type EditSubscription = {
  type: SubsActionTypes.EDIT_SUBSCRIPTION;
  payload: SubData;
};
export type DeleteSubscription = {
  type: SubsActionTypes.DELETE_SUBSCRIPTION;
  id: number;
};
export type ToggleIsFetching = {
  type: SubsActionTypes.TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export type SetStatusMessage = {
  type: SubsActionTypes.SET_STATUS_MESSAGE;
  message: string;
};
export type SetSubscriptionData = {
  type: SubsActionTypes.SET_SUBSCRIPTION_DATA;
  payload: SubData;
};
export type ActionsSubscriptions =
  | SetSubscriptions
  | СreatingSubscription
  | EditSubscription
  | DeleteSubscription
  | ToggleIsFetching
  | SetStatusMessage
  | SetSubscriptionData;

// Subscriptions Response
export type GetSubscriptionsResponse = Omit<ISubscriptionsState, 'is_fetching'>;
