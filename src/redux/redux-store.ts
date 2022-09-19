import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk"
import appReduser from "./app-reducer";
import authReducer from "./auth-reducer";
import imageReducer from "./image-reducer";
import popupMenuReducer from "./popup-reducer";
import postCreateReducer from "./postCreate-reducer";
import postDataReducer from "./postData-reducer";
import postListsReducer from "./postLists-reducer";
import profileReducer from "./profile-reducer";
import subscriptionsReducer from "./subscriptions-reducer";
import usersReducer from "./users-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    auth: authReducer,
    appInitialized: appReduser,
    postCreate: postCreateReducer,
    postLists: postListsReducer,
    postData: postDataReducer,
    usersData: usersReducer,
    subscriptionsData: subscriptionsReducer,
    popupMenu: popupMenuReducer,
    image: imageReducer
});

export type StateType = ReturnType<typeof reducers> 

let store = createStore(reducers, applyMiddleware(thunk));

export default store;