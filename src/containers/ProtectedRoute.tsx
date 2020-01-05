import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState, AuthState } from "../redux/state";

const ProtectedRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const { ready, currentUser } = useSelector<AppState, AuthState>(s => s.auth);

  if (!ready) {
    return null;
  }

  if (!currentUser) {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: location }
            }}
          />
        )}
      />
    );
  }

  return <Route component={component} {...rest} />;
};

export default ProtectedRoute;
