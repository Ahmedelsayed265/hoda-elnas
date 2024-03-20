import { createSlice } from "@reduxjs/toolkit";

export const privacy = createSlice({
  name: "privacy",
  initialState: {
    privacy: []
  },
  reducers: {
    setPrivacy: (state, action) => {
      state.privacy = action.payload;
    }
  }
});

export const { setPrivacy } = privacy.actions;
export default privacy.reducer;
