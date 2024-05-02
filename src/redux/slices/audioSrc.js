import { createSlice } from "@reduxjs/toolkit";

export const audioSrc = createSlice({
  name: "audioSrc",
  initialState: {
    src: ""
  },
  reducers: {
    setSrc: (state, action) => {
      state.src = action.payload;
    }
  }
});

export const { setSrc } = audioSrc.actions;
export default audioSrc.reducer;
