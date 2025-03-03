import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numbers: {},
};

const numberInputSlice = createSlice({
  name: "numbers",
  initialState,
  reducers: {
    setNumberValue: (state, action) => {
      const { id, value } = action.payload;
      if (!state.numbers[id]) {
        state.numbers[id] = { value: "", valid: null, errorMessage: "", visible: true, required: false, min: null, max: null };
      }
      state.numbers[id].value = value;
    },
    validateNumber: (state, action) => {
      const { id, min, max } = action.payload;
      if (!state.numbers[id]) return;

      const value = state.numbers[id].value.trim();

      if (state.numbers[id].required && value === "") {
        state.numbers[id].valid = false;
        state.numbers[id].errorMessage = "This field is required";
        state.numbers[id].uiClass = "form-control is-invalid";
    } else if (value && min !== undefined && value < min) {
        state.numbers[id].valid = false;
        state.numbers[id].errorMessage = `Value must be at least ${min}`;
        state.numbers[id].uiClass = "form-control is-invalid";
    } else if (value && max !== undefined && value > max) {
        state.numbers[id].valid = false;
        state.numbers[id].errorMessage = `Value must be at most ${max}`;
        state.numbers[id].uiClass = "form-control is-invalid";
    } else {
        state.numbers[id].valid = true;
        state.numbers[id].errorMessage = "";
        state.numbers[id].uiClass = "form-control is-valid";
      }
    },
    resetNumber: (state, action) => {
      const { id } = action.payload;
      if (state.numbers[id]) {
        state.numbers[id] = { value: "", valid: null, errorMessage: "", visible: true, required: false, min: null, max: null };
      }
    },
    setNumberVisibility: (state, action) => {
      const { id, visible } = action.payload;
      if (!state.numbers[id]) {
        state.numbers[id] = { value: "", valid: null, errorMessage: "", visible, required: false, min: null, max: null };
      } else {
        state.numbers[id].visible = visible;
      }
    },
    setNumberRequired: (state, action) => {
      const { id, required } = action.payload;
      if (!state.numbers[id]) {
        state.numbers[id] = { value: "", valid: null, errorMessage: "", visible: true, required, min: null, max: null };
      } else {
        state.numbers[id].required = required;
      }
    },
    setNumberRange: (state, action) => {
      const { id, min, max } = action.payload;
      if (!state.numbers[id]) {
        state.numbers[id] = { value: "", valid: null, errorMessage: "", visible: true, required: false, min, max };
      } else {
        state.numbers[id].min = min;
        state.numbers[id].max = max;
      }
    },
    validateAllVisibleFields: (state) => {
        let isPageValid = true;
      
        Object.keys(state.numbers).forEach((id) => {
          const numberField = state.numbers[id];
      
          if (numberField.visible) {
            const value = numberField.value.trim();
      
            if (numberField.required && value === "") {
              numberField.valid = false;
              numberField.errorMessage = "This field is required";
              numberField.uiClass = "form-control is-invalid";
              isPageValid = false;
            } else if (value && numberField.min !== null && value < numberField.min) {
              numberField.valid = false;
              numberField.errorMessage = `Value must be at least ${numberField.min}`;
              numberField.uiClass = "form-control is-invalid";
              isPageValid = false;
            } else if (value && numberField.max !== null && value > numberField.max) {
              numberField.valid = false;
              numberField.errorMessage = `Value must be at most ${numberField.max}`;
              numberField.uiClass = "form-control is-invalid";
              isPageValid = false;
            } else {
              numberField.valid = true;
              numberField.errorMessage = "";
              numberField.uiClass = "form-control is-valid";
            }
          }
        });
      
        state.pageValid = isPageValid;
    },      
    resetAllFields: (state) => {      
        Object.keys(state.numbers).forEach((id) => {
          state.numbers[id] = { value: "", valid: null, errorMessage: "", visible: true, required: false, min: null, max: null };
        });
    }    
  },
});

export const { setNumberValue, validateNumber, resetNumber, setNumberVisibility, setNumberRequired, setNumberRange, validateAllVisibleFields, resetAllFields } = numberInputSlice.actions;
export default numberInputSlice.reducer;
