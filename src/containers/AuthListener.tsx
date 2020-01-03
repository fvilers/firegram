import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../redux/state";
import firebase from "../firebase";
import { authStateChanged, authStateFailed } from "../redux/actions/auth-state";

const AuthListener: React.FC<{}> = ({ children }) => {
  const ready = useSelector<AppState, boolean>(s => s.auth.ready);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      user => dispatch(authStateChanged(user)),
      error => dispatch(authStateFailed(error))
    );

    return () => unsubscribe();
  }, [dispatch]);

  if (!ready) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default AuthListener;
