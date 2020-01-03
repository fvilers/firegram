import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../redux/state";
import firebase from "../firebase";
import SignOut from "./SignOut";

const Navigation: React.FC = () => {
  const currentUser = useSelector<AppState, firebase.User | null>(
    s => s.auth.currentUser
  );

  return (
    <nav>
      <p>
        {currentUser ? (
          <>
            Welcome, {currentUser.email}
            <br />
            <SignOut />
          </>
        ) : (
          <>
            <Link to="/sign-up">Sign up</Link>
            <br />
            <Link to="/sign-in">Sign in</Link>
          </>
        )}
      </p>
    </nav>
  );
};

export default Navigation;
