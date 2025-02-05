import { createSlice } from "@reduxjs/toolkit";

const geminiSlice = createSlice({
  name: "gemini",
  initialState: {
    showGeminiSearch: true,
    movieResults: null,
    movieNames: null,
  },
  reducers: {
    toggleShowGeminiSearch: (state) => {
      state.showGeminiSearch = !state.showGeminiSearch;
    },
    addGeminiMovie: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});

export const { toggleShowGeminiSearch, addGeminiMovie } = geminiSlice.actions;
export default geminiSlice.reducer;
