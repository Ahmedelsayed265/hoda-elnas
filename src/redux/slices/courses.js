import { createSlice } from "@reduxjs/toolkit";

export const courses = createSlice({
  name: "courses",
  initialState: {
    courses: []
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    }
  }
});

export const { setCourses } = courses.actions;
export default courses.reducer;
