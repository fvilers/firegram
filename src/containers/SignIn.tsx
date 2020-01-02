import React from "react";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { AppState, AsyncOperation } from "../redux/state";
import { signIn } from "../redux/actions/sign-in";
import SignInForm, { SignInFormValues } from "../components/SignInForm";

const SignIn: React.FC = () => {
  const location = useLocation();
  const { busy, errorMessage } = useSelector<AppState, AsyncOperation>(
    s => s.auth.ui.signIn
  );
  const dispatch = useDispatch();
  const handleSubmit = ({ email, password }: SignInFormValues) => {
    dispatch(signIn(email, password, location?.state?.from?.pathname));
  };

  return (
    <SignInForm
      disabled={busy}
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
    />
  );
};

export default SignIn;
