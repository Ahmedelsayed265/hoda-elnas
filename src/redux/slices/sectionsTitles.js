import { createSlice } from "@reduxjs/toolkit";

export const sectionsTitles = createSlice({
  name: "titles",
  initialState: {
    titles: []
  },
  reducers: {
    setTitles: (state, action) => {
      state.titles = action.payload;
    }
  }
});

export const { setTitles } = sectionsTitles.actions;
export default sectionsTitles.reducer;
