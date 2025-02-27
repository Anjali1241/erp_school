import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Provider store={store}>
      <Signup />
    </Provider>
  );
};

export default App;
