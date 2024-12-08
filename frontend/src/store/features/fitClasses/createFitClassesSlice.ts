import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fitClassInter, fitClassBase } from "../../../types";

const initialState: fitClassInter = {
  classes: [],
  loading: false,
  error: "",
  status: false,
  dashboard: {
    classes: [],
    loading: false,
    error: "",
    status: false,
  },
  createdClasses: {
    classes: [],
    loading: false,
    error: "",
    status: false,
  },
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
    req_classes_dash: (state) => {
      state.dashboard.loading = true;
    },
    get_classes_dash: (state, action: PayloadAction<fitClassBase[]>) => {
      state.dashboard.loading = false;
      state.dashboard.classes = action.payload;
      state.dashboard.status = true;
      state.dashboard.error = "";
    },
    fail_get_classes_dash: (state, action: PayloadAction<string>) => {
      state.dashboard.loading = false;
      state.dashboard.classes = [];
      state.dashboard.status = false;
      state.dashboard.error = action.payload;
    },
    req_classes_create: (state) => {
      state.createdClasses.loading = true;
    },
    get_classes_create: (state, action: PayloadAction<fitClassBase[]>) => {
      state.createdClasses.loading = false;
      state.createdClasses.classes = action.payload;
      state.createdClasses.status = true;
      state.createdClasses.error = "";
    },
    fail_get_classes_create: (state, action: PayloadAction<string>) => {
      state.createdClasses.loading = false;
      state.createdClasses.classes = [];
      state.createdClasses.status = false;
      state.createdClasses.error = action.payload;
    },
  },
});
export default classesSlice.reducer;
export const {
  req_classes,
  get_classes,
  fail_get_classes,
  req_classes_dash,
  get_classes_dash,
  fail_get_classes_dash,
  req_classes_create,
  get_classes_create,
  fail_get_classes_create,
} = classesSlice.actions;
