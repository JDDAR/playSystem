import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../models";

const initialState: UserInfo = {
  token: "",
  user: {
    id: "",
    userName: "",
    image: "",
    role: "CLIENT",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = "";
      state.user = initialState.user;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
