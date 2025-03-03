import React from "react";
import { useState } from "react";
import InputBox from "../common/InputBox";

function Login() {
  const [userData, setUserData] = useState({
    name: "",
    password: "",
  });

  return (
    <div className="container m-auto p-2 bg-yellow-500">
      <div className="bg-blue-500 text-white text-3xl font-bold p-6">
        Tailwind is working!
      </div>
      Login Form
      <InputBox
        label="Name"
        placeholderValue="Enter your name"
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        value={userData.name}
      />
      <InputBox
        label="Password"
        placeholderValue="Enter your Password"
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        value={userData.password}
        type="password"
      />
      <button onClick={() => console.log(userData)}>Submit</button>
    </div>
  );
}

export default Login;
