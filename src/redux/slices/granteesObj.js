import { createSlice } from "@reduxjs/toolkit";

export const grantees = createSlice({
  name: "grantees",
  initialState: {
    grantees: {}
  },
  reducers: {
    setGrantees: (state, action) => {
      state.grantees = action.payload;
    }
  }
});

export const { setGrantees } = grantees.actions;
export default grantees.reducer;
