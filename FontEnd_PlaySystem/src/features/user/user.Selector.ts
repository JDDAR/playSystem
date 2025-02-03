import { RootState } from "../../app/store";

export const selectUserRole = (state: RootState) => state.user.user.role;
export const selectUserName = (state: RootState) => state.user.user.userName;
