import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk"
import appReduser from "./app-reducer";
import authReducer from "./auth-reducer";
import imageReducer from "./image-reducer";
import popupMenuReducer from "./popupMenu-reducer";
import postPreviewsReducer from "./postPreviews-reducer";
import profileReducer from "./profile-reducer";
import subscriptionsReducer from "./subscriptions-reducer";
import usersReducer from "./users-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    auth: authReducer,
    appInitialized: appReduser,
    postPreviews: postPreviewsReducer,
    usersData: usersReducer,
    subscriptionsData: subscriptionsReducer,
    popupMenu: popupMenuReducer,
    image: imageReducer
});

export type StateType = ReturnType<typeof reducers> 

let store = createStore(reducers, applyMiddleware(thunk));

export default store;