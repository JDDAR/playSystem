import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import { UserInfo } from "../models";

export interface AppStore {
  user: UserInfo;
}
const store = configureStore<AppStore>({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
