import { RootState } from "../../app/store";

export const selectUserRole = (state: RootState) => state.auth.user.role;
export const selectUserName = (state: RootState) => state.auth.user.userName;
export const selectToken = (state: RootState) => state.auth.token;
