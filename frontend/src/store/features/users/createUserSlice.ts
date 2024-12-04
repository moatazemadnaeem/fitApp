import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userResInter, userInter, UserCurrInter } from "../../../types";

const initialState: userInter = {
  user: null,
  loading: false,
  error: "",
  status: false,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    req_user: (state) => {
      state.loading = true;
    },
    signin_user: (state, action: PayloadAction<userResInter>) => {
      state.loading = false;
      state.user = { name: action.payload.name, email: action.payload.email };
      state.status = action.payload.status;
      state.token = action.payload.token;
      sessionStorage.setItem("jwt", action.payload.token!);
    },
    curr_user: (state, action: PayloadAction<UserCurrInter>) => {
      state.loading = false;
      state.user = { name: action.payload.name, email: action.payload.email };
      state.status = action.payload.status;
    },
    fail_signin_user: (state, action: PayloadAction<{ msg: string }>) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = action.payload.msg;
      state.status = false;
    },
  },
});
export default userSlice.reducer;
export const { req_user, signin_user, fail_signin_user, curr_user } =
  userSlice.actions;
