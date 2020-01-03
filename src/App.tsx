import React from "react";
import { Router } from "react-router-dom";
import AuthListener from "./containers/AuthListener";
import history from "./history";
import Routes from "./Routes";

const App: React.FC = () => {
  return (
    <AuthListener>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthListener>
  );
};

export default App;
