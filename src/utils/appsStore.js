import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./moveiSlice";
import geminiReducer from "./geminiSlice.js";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
    gemini: geminiReducer,
  },
});

export default appStore;
