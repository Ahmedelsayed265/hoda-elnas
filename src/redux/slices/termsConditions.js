import { createSlice } from "@reduxjs/toolkit";

export const termsConditions = createSlice({
  name: "termsConditions",
  initialState: {
    termsConditions: []
  },
  reducers: {
    setTermsConditions: (state, action) => {
      state.termsConditions = action.payload;
    }
  }
});

export const { setTermsConditions } = termsConditions.actions;
export default termsConditions.reducer;
