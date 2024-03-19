import { createSlice } from "@reduxjs/toolkit";

export const whyUs = createSlice({
  name: "whyUs",
  initialState: {
    whyUs: []
  },
  reducers: {
    setWhyUs: (state, action) => {
      state.whyUs = action.payload;
    }
  }
});

export const { setWhyUs } = whyUs.actions;
export default whyUs.reducer;
