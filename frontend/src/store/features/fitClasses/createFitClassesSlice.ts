import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fitClassInter, fitClassBase } from "../../../types";

const initialState: fitClassInter = {
  classes: [],
  loading: false,
  error: "",
  status: false,
  loadingDash: false,
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
    get_classes: (state, action: PayloadAction<fitClassBase[]>) => {
      state.loading = false;
      state.classes = action.payload;
      state.status = true;
      state.error = "";
      state.loadingDash = false;
    },
    fail_get_classes: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.classes = [];
      state.status = false;
      state.error = action.payload;
      state.loadingDash = false;
    },
  },
});
export default classesSlice.reducer;
export const { req_classes, get_classes, fail_get_classes, loading_dash } =
  classesSlice.actions;
