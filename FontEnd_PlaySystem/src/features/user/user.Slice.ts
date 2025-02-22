import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../models";
import { clearLocalStorage, persistLocalStorage } from "../../app/hooks";

export const initialState: UserInfo = {
  token: "",
  user: {
    id: "",
    userName: "",
    image: "",
    role: "CLIENT",
  },
};

export const UserKey = "user";

export const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem(UserKey)
    ? JSON.parse(localStorage.getItem(UserKey) as string)
    : initialState,
  reducers: {
    setUser: (state, action) => {
      persistLocalStorage<UserInfo>(UserKey, action.payload);
      return { ...state, ...action.payload };
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload };
      persistLocalStorage<UserInfo>(UserKey, result);
      return result;
    },
    resetUser: () => {
      clearLocalStorage(UserKey);
      return initialState;
    },
  },
});

export const { setUser, resetUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
