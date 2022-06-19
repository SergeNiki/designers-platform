import { ActionInitializedType, IAppState } from "../types/app"
import { getAuthUserData } from "./auth-reducer"

const INITIALIZED_SUCCESS = "app/INITIALIZED_SUCCESS"

let initialState: IAppState = {
    isInitialized: false
}

const appReduser = (state = initialState, action: ActionInitializedType): IAppState => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                isInitialized: true
            }
        default:
            return state
    }
}

export const initializedSuccess = (): ActionInitializedType => ({
    type: INITIALIZED_SUCCESS
})

export const initializeApp = () => {
    return async (dispatch: any) => {
      try {
        if (localStorage.getItem("token")) {
            await dispatch(getAuthUserData());
          }
          dispatch(initializedSuccess());
      } catch (error) {
          
      }
    };
  };

export default appReduser;