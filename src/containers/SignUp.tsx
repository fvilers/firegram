import React from "react";
import SignUpForm from "../components/SignUpForm";

const SignUp: React.FC = () => {
  return (
    <SignUpForm
      onSubmit={values => {
        console.log(values);
      }}
    />
  );
};

export default SignUp;
