import { createSlice } from "@reduxjs/toolkit";

export const partners = createSlice({
  name: "partners",
  initialState: {
    partners: []
  },
  reducers: {
    setPartners: (state, action) => {
      state.partners = action.payload;
    }
  }
});

export const { setPartners } = partners.actions;
export default partners.reducer;
