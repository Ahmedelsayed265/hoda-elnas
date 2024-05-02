import { createSlice } from "@reduxjs/toolkit";

export const audioSrc = createSlice({
  name: "audioSrc",
  initialState: {
    src: "",
    id: ""
  },
  reducers: {
    setSrc: (state, action) => {
      state.src = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    }
  }
});

export const { setSrc, setId } = audioSrc.actions;
export default audioSrc.reducer;
