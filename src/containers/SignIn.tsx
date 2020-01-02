import React from "react";
import SignInForm from "../components/SignInForm";

const SignIn: React.FC = () => {
  return <SignInForm onSubmit={values => console.log(values)} />;
};

export default SignIn;
