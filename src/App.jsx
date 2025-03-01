import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">

        <Signup />
      </div>
    </Provider>
  );
};

export default App;
