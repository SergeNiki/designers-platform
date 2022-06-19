//Initialized State
export interface IAppState {
  isInitialized: boolean;
}


//Initialized Action
export type ActionInitializedType = {
  type: "app/INITIALIZED_SUCCESS";
};