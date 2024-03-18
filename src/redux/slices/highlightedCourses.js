import { createSlice } from "@reduxjs/toolkit";

export const highlightedCourses = createSlice({
  name: "courses",
  initialState: {
    courses: []
  },
  reducers: {
    setHighLightedCourses: (state, action) => {
      state.courses = action.payload;
    }
  }
});

export const { setHighLightedCourses } = highlightedCourses.actions;
export default highlightedCourses.reducer;
