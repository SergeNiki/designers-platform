import { IAppState } from "./app";
import { IAuthState } from "./auth";
import { IPostPreviews } from "./posts";
import { IProfileState } from "./profile";
import { IUsersState } from "./users";

export type StateType = {
  profilePage: IProfileState;
  auth: IAuthState;
  appInitialized: IAppState;
  postPreviews: IPostPreviews;
  usersData: IUsersState
};
