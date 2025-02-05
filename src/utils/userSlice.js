import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      // console.log("At addUser reducer");
      // console.log(action.payload);
      return action.payload;
      // equivalent to setting the state.obj = action.payload
    },
    removeUser: (state, action) => {
      return null;
      // equivalent to setting the state.obj = null
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
