import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputText from "../components/InputText";
import { setVisibility } from "../Slices/inputSlice";

const Signup = () => {
  const dispatch = useDispatch();

  // Get initial/updated values from Redux store
  const firstname = useSelector((state) => state.inputs?.inputs?.firstname?.value || "");
  const lastname = useSelector((state) => state.inputs?.inputs?.lastname?.value || "");
  const email = useSelector((state) => state.inputs?.inputs?.email?.value || "");

  // Effect to update visibility based on conditions whenever value updated on above variables
  useEffect(() => {
    dispatch(setVisibility({ id: "lastname", visible: firstname.trim() ? true : false }));
    dispatch(setVisibility({ id: "email", visible: firstname.trim() && lastname.toLowerCase() === "shah" ? true : false }));
  }, [firstname, lastname, dispatch]);

  // Get updated visibility states from redux store (initial or default is false)
  const firstnameVisible = true
  const lastnameVisible = useSelector((state) => state.inputs?.inputs?.lastname?.visible || false);
  const emailVisible = useSelector((state) => state.inputs?.inputs?.email?.visible || false);

  return (
    <div>
      {/* Signup */}
      <h2>Signup</h2>

      {firstnameVisible && (
        <>
          <InputText id="firstname" qtext="First name" help="" hint="" required={true} />
          <br/>
        </>
      )}

      {lastnameVisible && (
        <>
          <InputText id="lastname" qtext="Last name" help="" hint="" required={true} />
          <br/>
        </>
      )}

      {emailVisible && (
        <>
          <InputText id="email" qtext="Email ID" help="" hint="" required={false} />
          <br/>
        </>
      )}
    </div>
  );
};

export default Signup;
