import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputs: {},
};

const inputSlice = createSlice({
  name: "inputs",
  initialState,
  reducers: {
    setValue: (state, action) => {
      const { id, value } = action.payload;
      if (!state.inputs[id]) {
        state.inputs[id] = { value: "", valid: null, errorMessage: "", visible: true, required: false };
      }
      state.inputs[id].value = value;
    },
    validate: (state, action) => {
      const { id } = action.payload;
      if (!state.inputs[id]) return;

      // Only validate if the field is required
      if (state.inputs[id].required && state.inputs[id].value.trim() === "") {
        state.inputs[id].valid = false;
        state.inputs[id].errorMessage = "This field is required";
      } else {
        state.inputs[id].valid = true;
        state.inputs[id].errorMessage = "";
      }
    },
    reset: (state, action) => {
      const { id } = action.payload;
      if (state.inputs[id]) {
        state.inputs[id] = { value: "", valid: null, errorMessage: "", visible: true, required: false };
      }
    },
    setVisibility: (state, action) => {
      const { id, visible } = action.payload;
      if (!state.inputs[id]) {
        state.inputs[id] = { value: "", valid: null, errorMessage: "", visible, required: false };
      } else {
        state.inputs[id].visible = visible;
      }
    },
    setRequired: (state, action) => {
      const { id, required } = action.payload;
      if (!state.inputs[id]) {
        state.inputs[id] = { value: "", valid: null, errorMessage: "", visible: true, required };
      } else {
        state.inputs[id].required = required;
      }
    }
  },
});

export const { setValue, validate, reset, setVisibility, setRequired } = inputSlice.actions;
export default inputSlice.reducer;
