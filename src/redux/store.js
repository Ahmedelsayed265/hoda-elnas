import { configureStore } from "@reduxjs/toolkit";
import language from "./slices/language";
import authedUser from "./slices/authedUser";
import courses from "./slices/courses";
import homeIntro from "./slices/homeIntro";
import highlightedCourses from "./slices/highlightedCourses";
import whyUs from "./slices/whyUs";
import statistics from "./slices/statistics";
import faqs from "./slices/faqs";
import termsConditions from "./slices/termsConditions";
import privacy from "./slices/privacy";
import grantees from "./slices/granteesObj";
import comparsion from "./slices/comparsion";
import feedBacks from "./slices/feedBacks";

export const store = configureStore({
  reducer: {
    language,
    authedUser,
    courses,
    homeIntro,
    highlightedCourses,
    whyUs,
    statistics,
    faqs,
    termsConditions,
    privacy,
    grantees,
    comparsion,
    feedBacks
  }
});
