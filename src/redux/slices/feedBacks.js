import { createSlice } from "@reduxjs/toolkit";

export const feedBacks = createSlice({
  name: "feedBacks",
  initialState: {
    feedBacks: []
  },
  reducers: {
    setFeedBacks: (state, action) => {
      state.feedBacks = action.payload;
    }
  }
});

export const { setFeedBacks } = feedBacks.actions;
export default feedBacks.reducer;
