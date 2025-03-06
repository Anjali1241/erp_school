import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputText from "../components/InputText";
import InputNumber from "../components/InputNumber";
import { setVisibility, resetAllFields as resetTextInputs } from "../Slices/inputSlice";
import { validateAllVisibleFields as validateTextInputs } from "../Slices/inputSlice";
import { validateAllVisibleFields as validateNumberInputs, resetAllFields as resetNumberInputs } from "../Slices/numberInputSlice";

const Signup = () => {
  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);
  const [pageValid, setPageValid] = useState(null);

  // Validate page
  const handleValidatePage = () => {
    setSubmitted(true);
    dispatch(validateTextInputs());
    dispatch(validateNumberInputs());
  };

  // Reset all inputs
  const handleResetPage = () => {
    dispatch(resetTextInputs());
    dispatch(resetNumberInputs());
    setSubmitted(false);
    setPageValid(null);
  };

  // Validate all same type component
  const textPageValid = useSelector((state) => state.inputs.pageValid);
  const numberPageValid = useSelector((state) => state.numbers.pageValid);
  
  // Keep updated pageValid value
  useEffect(() => {
    if (textPageValid !== null && numberPageValid !== null) {
      setPageValid(textPageValid && numberPageValid ? true : false);
      console.log("Is Page Valid?", textPageValid && numberPageValid);
    }
  }, [textPageValid, numberPageValid]);

  // Get initial/updated values from Redux store
  const firstname = useSelector((state) => state.inputs?.inputs?.firstname?.value || "");
  const lastname = useSelector((state) => state.inputs?.inputs?.lastname?.value || "");

  // Effect to update visibility based on conditions
  useEffect(() => {
    dispatch(setVisibility({ id: "lastname", visible: firstname.trim() ? true : false }));
    dispatch(setVisibility({ id: "email", visible: firstname.trim() && lastname.toLowerCase() === "shah" ? true : false }));
  }, [firstname, lastname, dispatch]);

  // Get updated visibility states from Redux store
  const firstnameVisible = true;
  const lastnameVisible = useSelector((state) => state.inputs?.inputs?.lastname?.visible || false);
  const emailVisible = useSelector((state) => state.inputs?.inputs?.email?.visible || false);

  return (
    <div>
      <h2>Signup : {submitted ? (pageValid ? 'valid' : 'invalid') : ''}</h2>
      <div className="row">
        <div className="col-12">
          {firstnameVisible && <InputText id="firstname" label="First name" required={true} />}
          {lastnameVisible && <InputText id="lastname" label="Last name" required={true} />}
          {emailVisible && <InputText id="email" label="Email ID" required={false} />}
          
          <InputNumber id="age" label="Age"  required={true} min={18} max={40} />
          <InputNumber id="enroll" label="Enroll Number" required={true} min={100} max={999} />

          <button className="btn btn-primary mt-2 me-2" onClick={handleValidatePage}>
            Submit
          </button>
          <button className="btn btn-secondary mt-2" onClick={handleResetPage}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
