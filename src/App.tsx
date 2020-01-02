import React from "react";
import { Router } from "react-router-dom";
import history from "./history";
import Routes from "./Routes";

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
};

export default App;
