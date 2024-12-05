import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fitClassInter, fitClassBase } from "../../../types";

const initialState: fitClassInter = {
  classes: [],
  loading: false,
  error: "",
  status: false,
  loadingDash: false,
  loadingClass: false,
};

const classesSlice = createSlice({
  name: "fit_class",
  initialState,
  reducers: {
    req_classes: (state) => {
      state.loading = true;
    },
    loading_dash: (state) => {
      state.loadingDash = true;
    },
    loading_class: (state) => {
      state.loadingClass = true;
    },
    get_classes: (state, action: PayloadAction<fitClassBase[]>) => {
      state.loading = false;
      state.classes = action.payload;
      state.status = true;
      state.error = "";
      state.loadingDash = false;
      state.loadingClass = false;
    },
    fail_get_classes: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.classes = [];
      state.status = false;
      state.error = action.payload;
      state.loadingDash = false;
      state.loadingClass = false;
    },
  },
});
export default classesSlice.reducer;
export const {
  req_classes,
  get_classes,
  fail_get_classes,
  loading_dash,
  loading_class,
} = classesSlice.actions;
