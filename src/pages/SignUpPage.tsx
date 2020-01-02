import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../containers/SignUp";

const SignUpPage: React.FC = () => {
  return (
    <div>
      <h1>Sign up</h1>
      <SignUp />
      <p>
        Already have an account? <Link to="/sign-in">Sign in instead</Link>
      </p>
    </div>
  );
};

export default SignUpPage;
