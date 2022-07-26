// Subscriptions State
export interface ISubscriptionsState {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<SubData>;
  isFetching: boolean;
}
export type SubData = {
  id: number;
  owner: number;
  name: string;
  description: string;
  image: any;
  price: string;
  price_currency: string;
  is_subscribed: boolean;
};

export type SubscriptionData = Omit<SubData, "id" | "owner" | "is_subscribed">

// Subscriptions Actions
export enum SubsActionTypes {
    GET_SUBSCRIPTIONS = "subscriptions/GET_SUBSCRIPTIONS",
    CREATING_SUBSCRIPTION = "subscriptions/CREATING_SUBSCRIPTION",
    EDIT_SUBSCRIPTION = "subscriptions/EDIT_SUBSCRIPTION",
    DELETE_SUBSCRIPTION = "subscriptions/DELETE_SUBSCRIPTION",
    TOGGLE_IS_FETCHING = "subscriptions/TOGGLE_IS_FETCHING"
}
export type ActionGetSubscriptions = {
    type: SubsActionTypes.GET_SUBSCRIPTIONS
    payload: GetSubscriptionsResponse
}
export type ActionСreatingSubscription = {
    type: SubsActionTypes.CREATING_SUBSCRIPTION
    payload: SubData
}
export type ActionEditSubscription = {
    type: SubsActionTypes.EDIT_SUBSCRIPTION
    payload: SubData
}
export type ActionDeleteSubscription = {
    type: SubsActionTypes.DELETE_SUBSCRIPTION
    id: number
}
export type ActionToggleIsFetching = {
    type: SubsActionTypes.TOGGLE_IS_FETCHING
    isFetching: boolean
}
export type ActionsSubscriptions = ActionGetSubscriptions | ActionСreatingSubscription | ActionEditSubscription | ActionDeleteSubscription | ActionToggleIsFetching


// Subscriptions Response
export type GetSubscriptionsResponse = Omit<ISubscriptionsState, "is_fetching">;
export type СreatingSubscriptionResponse = SubData;
