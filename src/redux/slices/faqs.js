import { createSlice } from "@reduxjs/toolkit";

export const faqs = createSlice({
  name: "faqs",
  initialState: {
    faqs: []
  },
  reducers: {
    setFaqs: (state, action) => {
      state.faqs = action.payload;
    }
  }
});

export const { setFaqs } = faqs.actions;
export default faqs.reducer;
