import { createSlice } from "@reduxjs/toolkit";

export const vConnectLink = createSlice({
  name: "vConnectLink",
  initialState: {
    vConnectLink: ""
  },
  reducers: {
    setLink: (state, action) => {
      state.vConnectLink = action.payload;
    }
  }
});

export const { setLink } = vConnectLink.actions;
export default vConnectLink.reducer;
