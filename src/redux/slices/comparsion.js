import { createSlice } from "@reduxjs/toolkit";

export const comparsion = createSlice({
  name: "comparsion",
  initialState: {
    header: {},
    body: []
  },
  reducers: {
    setHeader: (state, action) => {
      state.header = action.payload;
    },
    setBody: (state, action) => {
      state.body = action.payload;
    }
  }
});

export const { setHeader, setBody } = comparsion.actions;
export default comparsion.reducer;
