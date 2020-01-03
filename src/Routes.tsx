import React from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./containers/ProtectedRoute";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import NewPostPage from "./pages/NewPostPage";
import NotFoundPage from "./pages/NotFoundPage";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/sign-up" component={SignUpPage} />
      <Route exact path="/sign-in" component={SignInPage} />
      <ProtectedRoute exact path="/new-post" component={NewPostPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
