import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../redux/state";
import { signOut } from "../redux/actions/sign-out";

const SignOut: React.FC = () => {
  const busy = useSelector<AppState, boolean>(s => s.auth.ui.signOut.busy);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(signOut());
  };

  return (
    <button disabled={busy} onClick={handleClick}>
      Sign out
    </button>
  );
};

export default SignOut;
