import { Dispatch } from "react"
import SubscriptionsService from "../services/SubscriptionsService"
import { ActionDeleteSubscription, ActionEditSubscription, ActionGetSubscriptions, ActionsSubscriptions, ActionToggleIsFetching, ActionСreatingSubscription, GetSubscriptionsResponse, ISubscriptionsState, SubData, SubsActionTypes, SubscriptionData } from "../types/subscriptions"

let initialState: ISubscriptionsState = {
    count: 0,
    next: null,
    previous: null,
    results: [],
    isFetching: false
}

const subscriptionsReducer = (state = initialState, action: ActionsSubscriptions): ISubscriptionsState => {
    switch (action.type) {
        case SubsActionTypes.GET_SUBSCRIPTIONS:
            return {...state, ...action.payload}
        case SubsActionTypes.CREATING_SUBSCRIPTION:
            return {...state, results: [...state.results, {...action.payload}]}
        case SubsActionTypes.EDIT_SUBSCRIPTION:
            return {...state, results: state.results.map((sub: SubData) => {
                if (sub.id == action.payload.id) {
                    return action.payload;
                }
                return sub;
            })}
        case SubsActionTypes.DELETE_SUBSCRIPTION:
            return {...state, results: state.results.filter((sub: SubData) => sub.id !== action.id)}
        case SubsActionTypes.TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}


export const getSubscriptionsAC = (payload: GetSubscriptionsResponse): ActionGetSubscriptions => ({
    type: SubsActionTypes.GET_SUBSCRIPTIONS,
    payload
})
export const creatingSubscriptionsAC = (payload: SubData): ActionСreatingSubscription => ({
    type: SubsActionTypes.CREATING_SUBSCRIPTION,
    payload
})
export const editSubscriptionsAC = (payload: SubData): ActionEditSubscription => ({
    type: SubsActionTypes.EDIT_SUBSCRIPTION,
    payload
})
export const deleteSubscriptionsAC = (id: number): ActionDeleteSubscription => ({
    type: SubsActionTypes.DELETE_SUBSCRIPTION,
    id
})
export const toggleIsFetching = (isFetching: boolean): ActionToggleIsFetching => ({
    type: SubsActionTypes.TOGGLE_IS_FETCHING,
    isFetching
})


export const getSubscriptions = (id: number) => {
    return async (dispatch: Dispatch<ActionsSubscriptions>) => {
        dispatch(toggleIsFetching(true))
        try {
            const response = await SubscriptionsService.getSubscriptions(id)
            dispatch(getSubscriptionsAC(response.data))
            dispatch(toggleIsFetching(false))
        } catch (error) {
            
        }
    }
}
export const creatingSubscription = (data: SubscriptionData) => {
    return async (dispatch: Dispatch<ActionsSubscriptions>) => {
        dispatch(toggleIsFetching(true))
        try {
            const response = await SubscriptionsService.creatingSubscription(data)
            dispatch(creatingSubscriptionsAC(response.data))
            dispatch(toggleIsFetching(false))
        } catch (error) {
            
        }
    }
}
export const editSubscription = (id: number, data: SubscriptionData) => {
    return async (dispatch: Dispatch<ActionsSubscriptions>) => {
        dispatch(toggleIsFetching(true))
        try {
            const response = await SubscriptionsService.editSubscription(id, data)
            dispatch(editSubscriptionsAC(response.data))
            dispatch(toggleIsFetching(false))
        } catch (error) {
            
        }
    }
}
export const deleteSubscription = (id: number) => {
    return async (dispatch: Dispatch<ActionsSubscriptions>) => {
        dispatch(toggleIsFetching(true))
        try {
            const response = await SubscriptionsService.deleteSubscription(id)
            dispatch(deleteSubscriptionsAC(id))
            dispatch(toggleIsFetching(false))
        } catch (error) {
            
        }
    }
}

export default subscriptionsReducer