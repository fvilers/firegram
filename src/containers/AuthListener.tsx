import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dimmer, Loader, Message } from "semantic-ui-react";
import { AppState, AuthState } from "../redux/state";
import firebase from "../firebase";
import { authStateChanged, authStateFailed } from "../redux/actions/auth-state";

const AuthListener: React.FC<{}> = ({ children }) => {
  const { errorMessage, ready } = useSelector<AppState, AuthState>(s => s.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      user => dispatch(authStateChanged(user)),
      error => dispatch(authStateFailed(error))
    );

    return () => unsubscribe();
  }, [dispatch]);

  if (!ready) {
    return (
      <Dimmer active inverted>
        <Loader />
      </Dimmer>
    );
  }

  if (errorMessage) {
    return <Message negative>{errorMessage}</Message>;
  }

  return <>{children}</>;
};

export default AuthListener;
