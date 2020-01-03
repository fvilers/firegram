import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, AsyncOperation } from "../redux/state";
import { signUp } from "../redux/actions/sign-up";
import SignUpForm, { SignUpFormValues } from "../components/SignUpForm";

const SignUp: React.FC = () => {
  const { busy, errorMessage } = useSelector<AppState, AsyncOperation>(
    s => s.auth.ui.signUp
  );
  const dispatch = useDispatch();
  const handleSubmit = ({ name, email, password }: SignUpFormValues) => {
    dispatch(signUp(name, email, password));
  };

  return (
    <SignUpForm
      disabled={busy}
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
    />
  );
};

export default SignUp;
