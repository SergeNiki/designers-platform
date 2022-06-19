import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk"
import appReduser from "./app-reducer";
import authReducer from "./auth-reducer";
import postPreviewsReducer from "./postPreviews";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    auth: authReducer,
    appInitialized: appReduser,
    postPreviews: postPreviewsReducer,
    usersData: usersReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;