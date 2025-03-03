import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setValue, validate, reset, setRequired } from "../Slices/inputSlice";

const InputText = ({ id, label, help, hint, required = false }) => {
  const dispatch = useDispatch();

  // Initialize required attribute in Redux store
  useEffect(() => {
    dispatch(setRequired({ id, required }));
  }, [id, required, dispatch]);

  // Memoize the selected input state to prevent unnecessary re-renders
  const inputState = useSelector((state) => state.inputs?.inputs?.[id]) || {};
  const memoizedInputState = useMemo(() => ({ ...inputState }), [inputState]);

  const handleChange = (e) => {
    dispatch(setValue({ id, value: e.target.value }));
    dispatch(validate({ id }));
  };

  const handleBlur = () => {
    // dispatch(validate({ id }));
  };

  const handleReset = () => {
    dispatch(reset({ id }));
  };

  return (
    <div>
      <label className="form-label fs-5">{label}</label> <br />
      {help ? <div className="fw-bold small">{help}</div> : ""}
      <input type="text" className={memoizedInputState.uiClass || "form-control"} value={memoizedInputState.value || ""} onChange={handleChange} onBlur={handleBlur} />
      {hint ? <div><small className="text-primary fst-italic">{hint}</small></div> : ""}
      {memoizedInputState.valid === false && memoizedInputState.required && (
        <div><small className="text-danger">{memoizedInputState.errorMessage}</small></div>
      )}
    </div>
  );
};

export default InputText;
