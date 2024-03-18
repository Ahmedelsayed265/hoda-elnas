import { configureStore } from "@reduxjs/toolkit";
import language from "./slices/language";
import authedUser from "./slices/authedUser";
import courses from "./slices/courses";
import homeIntro from "./slices/homeIntro";
import highlightedCourses from "./slices/highlightedCourses";

export const store = configureStore({
  reducer: {
    language,
    authedUser,
    courses,
    homeIntro,
    highlightedCourses
  }
});
