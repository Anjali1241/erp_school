import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "./Slices/inputSlice";
import numberInputReducer from "./Slices/numberInputSlice"; // Import the new reducer

const store = configureStore({
  reducer: {
    inputs: inputReducer, // Ensure this matches the slice name
    numbers: numberInputReducer, // Register the number input reducer
  },
});

window.store = store; //expose the store globally (to print in console --> window.store.getState())

export default store;
