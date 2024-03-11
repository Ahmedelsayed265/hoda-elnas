import { configureStore } from "@reduxjs/toolkit";
import language from "./slices/language";
import authedUser  from './slices/authedUser';
import { courses } from './slices/courses';

export const store = configureStore({
  reducer: {
    language,
    authedUser,
    courses
  }
});
