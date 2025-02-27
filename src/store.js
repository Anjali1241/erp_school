import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "./Slices/inputSlice";

const store = configureStore({
  reducer: {
    inputs: inputReducer, // Ensure this matches the slice name
  },
});

window.store = store; //expose the store globally (to print in console --> window.store.getState())

export default store;
