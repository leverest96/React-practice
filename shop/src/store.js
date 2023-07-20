import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice.js";

let data = [
  { id: 0, name: "White and Black", count: 2 },
  { id: 2, name: "Grey Yordan", count: 1 },
];

let product = createSlice({
  name: "product",
  initialState: data,
  reducers: {
    changeCount(state, action) {
      let index = state.findIndex((a) => {
        return a.id == action.payload;
      });

      state[index].count++;
    },
    addItem(state, action) {
      state.push(action.payload);
    },
  },
});

export let { changeCount, addItem } = product.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    product: product.reducer,
  },
});
