import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userResInter, userInter, UserCurrInter } from "../../../types";

const initialState: userInter = {
  user: null,
  loading: false,
  error: "",
  status: false,
  token: null,
  currLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    req_user: (state) => {
      state.loading = true;
    },
    curr_user_loading: (state) => {
      state.currLoading = true;
    },
    signin_user: (state, action: PayloadAction<userResInter>) => {
      state.loading = false;
      state.user = { name: action.payload.name, email: action.payload.email };
      state.status = action.payload.status;
      state.token = action.payload.token;
      sessionStorage.setItem("jwt", action.payload.token!);
    },
    curr_user: (state, action: PayloadAction<UserCurrInter>) => {
      state.currLoading = false;
      state.user = { name: action.payload.name, email: action.payload.email };
      state.status = action.payload.status;
    },
    fail_signin_user: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
      state.status = false;
      state.currLoading = false;
    },
    signout_user: (state) => {
      state.user = null;
      state.token = null;
      state.status = false;
      sessionStorage.removeItem("jwt");
    },
  },
});
export default userSlice.reducer;
export const {
  req_user,
  signin_user,
  fail_signin_user,
  curr_user,
  curr_user_loading,
  signout_user,
} = userSlice.actions;
