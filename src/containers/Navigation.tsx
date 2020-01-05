import React from "react";
import { Container, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../redux/state";
import firebase from "../firebase";
import { signOut } from "../redux/actions/sign-out";

const Navigation: React.FC = () => {
  const currentUser = useSelector<AppState, firebase.User | null>(
    s => s.auth.currentUser
  );
  const busy = useSelector<AppState, boolean>(s => s.auth.ui.signOut.busy);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <Menu borderless>
      <Container>
        <Menu.Item as={Link} header to="/">
          Firegram
        </Menu.Item>
        {currentUser ? (
          <>
            <Menu.Item as={Link} to="/new-post">
              New post
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item as={Link} to={`/users/${currentUser.uid}`}>
                {currentUser.photoURL && (
                  <Image avatar src={currentUser.photoURL} />
                )}
                {currentUser.displayName}
              </Menu.Item>
              <Menu.Item disabled={busy} onClick={handleSignOut}>
                Sign out
              </Menu.Item>
            </Menu.Menu>
          </>
        ) : (
          <>
            <Menu.Menu position="right">
              <Menu.Item as={Link} to="/sign-in">
                Sign in
              </Menu.Item>
              <Menu.Item as={Link} to="/sign-up">
                Sign up
              </Menu.Item>
            </Menu.Menu>
          </>
        )}
      </Container>
    </Menu>
  );
};

export default Navigation;
