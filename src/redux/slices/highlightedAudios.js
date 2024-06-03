import { createSlice } from "@reduxjs/toolkit";

export const highlightedAudios = createSlice({
  name: "audios",
  initialState: {
    audios: []
  },
  reducers: {
    setHighLightedAudios: (state, action) => {
      state.audios = action.payload;
    }
  }
});

export const { setHighLightedAudios } = highlightedAudios.actions;
export default highlightedAudios.reducer;
