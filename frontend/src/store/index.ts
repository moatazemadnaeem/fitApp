import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/createUserSlice";
import fitClassReducer from "./features/fitClasses/createFitClassesSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    classes: fitClassReducer,
  },
});
