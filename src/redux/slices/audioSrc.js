import { createSlice } from "@reduxjs/toolkit";

export const audioSrc = createSlice({
  name: "audioSrc",
  initialState: {
    src: "",
    id: "",
    name: "",
    isPlaying: false
  },
  reducers: {
    setSrc: (state, action) => {
      state.src = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    }
  }
});

export const { setSrc, setId, setName, setIsPlaying } = audioSrc.actions;
export default audioSrc.reducer;
