import React from "react";

function InputBox({ label, placeholderValue, onChange, value, type = "" }) {
  return (
    <div className="bg-red-300">
      <label >{label}</label>
      <input
        type={type}
        placeholder={placeholderValue}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default InputBox;
