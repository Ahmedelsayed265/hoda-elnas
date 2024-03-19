import { createSlice } from "@reduxjs/toolkit";

export const statistics = createSlice({
  name: "statistics",
  initialState: {
    statistics: []
  },
  reducers: {
    setStatistics: (state, action) => {
      state.statistics = action.payload;
    }
  }
});

export const { setStatistics } = statistics.actions;
export default statistics.reducer;
