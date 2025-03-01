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
        state.inputs[id].uiClass = "form-control is-invalid";
      } else {
        state.inputs[id].valid = true;
        state.inputs[id].errorMessage = "";
        state.inputs[id].uiClass = "form-control is-valid";
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
    },
    validateAllVisibleFields: (state) => {
      let isPageValid = true;
    
      Object.keys(state.inputs).forEach((id) => {
        const input = state.inputs[id];
    
        if (input.visible) {
          // Validate the field
          if (input.required && input.value.trim() === "") {
            input.valid = false;
            input.errorMessage = "This field is required";
            input.uiClass = "form-control is-invalid";
            isPageValid = false;
          } else {
            input.valid = true;
            input.errorMessage = "";
            input.uiClass = "form-control is-valid";
          }
        }
      });
    
      state.pageValid = isPageValid;
    },      
    resetAllFields: (state) => {      
        Object.keys(state.inputs).forEach((id) => {
          state.inputs[id] = { value: "", valid: null, errorMessage: "", visible: true, required: false };
        });
    }
  },
});

export const { setValue, validate, reset, setVisibility, setRequired, validateAllVisibleFields, resetAllFields } = inputSlice.actions;
export default inputSlice.reducer;
