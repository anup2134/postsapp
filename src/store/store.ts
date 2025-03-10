import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
