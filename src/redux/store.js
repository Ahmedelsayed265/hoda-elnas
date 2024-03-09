import { configureStore } from "@reduxjs/toolkit";
import language from "./slices/language";
import authedUser  from './slices/authedUser';

export const store = configureStore({
  reducer: {
    language,
    authedUser
  }
});
