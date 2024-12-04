import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/createUserSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
