import React from "react";
import { Link } from "react-router-dom";
import SignIn from "../containers/SignIn";

const SignInPage: React.FC = () => {
  return (
    <div>
      <h1>Sign in</h1>
      <SignIn />
      <p>
        Don't have an account? <Link to="/sign-up">Sign up now</Link>
      </p>
    </div>
  );
};

export default SignInPage;
