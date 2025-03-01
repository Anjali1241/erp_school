import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNumberValue, validateNumber, resetNumber, setNumberRequired, setNumberRange } from "../Slices/numberInputSlice";

const InputNumber = ({ id, qtext, help, hint, required = false, min, max }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNumberRequired({ id, required }));
    dispatch(setNumberRange({ id, min, max }));
  }, [id, required, min, max, dispatch]);

  const inputState = useSelector((state) => state.numbers?.numbers?.[id]) || {};
  const memoizedInputState = useMemo(() => ({ ...inputState }), [inputState]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Allow only numbers

    dispatch(setNumberValue({ id, value }));
    dispatch(validateNumber({ id, min, max }));
  };

  return (
    <div>
      <label className="form-label fs-5">{qtext}</label> <br />
      {help && <div className="fw-bold small">{help}</div>}
      <input
        type="number"
        className={memoizedInputState.uiClass || "form-control"}
        value={memoizedInputState.value || ""}
        onChange={handleChange}
        min={min}
        max={max}
      />
      {hint && <div><small className="text-primary fst-italic">{hint}</small></div>}
      {memoizedInputState.valid === false && memoizedInputState.required && (
        <div><small className="text-danger">{memoizedInputState.errorMessage}</small></div>
      )}
    </div>
  );
};

export default InputNumber;
