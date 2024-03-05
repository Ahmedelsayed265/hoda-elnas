import { createSlice } from "@reduxjs/toolkit";

export const language = createSlice({
  name: "language",
  initialState: {
    lang: "ar"
  },
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;
    }
  }
});

export const { setLanguage } = language.actions;
export default language.reducer;
