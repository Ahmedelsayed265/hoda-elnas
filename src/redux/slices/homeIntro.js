import { createSlice } from "@reduxjs/toolkit";

export const homeIntro = createSlice({
  name: "homeIntro",
  initialState: {
    homeIntro: {}
  },
  reducers: {
    setHomeIntro: (state, action) => {
      state.homeIntro = action.payload;
    }
  }
});

export const { setHomeIntro } = homeIntro.actions;
export default homeIntro.reducer;
