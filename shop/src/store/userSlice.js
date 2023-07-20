import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeAge(state, action) {
      state.age += action.payload;
    },
  },
});

export let { changeAge } = user.actions;

export default user;
