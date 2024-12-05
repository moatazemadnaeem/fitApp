import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fitClassInter, fitClassBase } from "../../../types";

const initialState: fitClassInter = {
  classes: [],
  loading: false,
  error: "",
  status: false,
};

const classesSlice = createSlice({
  name: "fit_class",
  initialState,
  reducers: {
    req_classes: (state) => {
      state.loading = true;
    },
    get_classes: (state, action: PayloadAction<fitClassBase[]>) => {
      state.loading = false;
      state.classes = action.payload;
      state.status = true;
      state.error = "";
    },
    fail_get_classes: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.classes = [];
      state.status = false;
      state.error = action.payload;
    },
  },
});
export default classesSlice.reducer;
export const { req_classes, get_classes, fail_get_classes } =
  classesSlice.actions;
