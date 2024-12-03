import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: false,
  email: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    load: (state) => {
      state.loading = true;
    },
  },
});
export default userSlice.reducer;
export const { load } = userSlice.actions;
