import React from "react";
import { Container } from "semantic-ui-react";
import Navigation from "../containers/Navigation";
import Profile from "../containers/Profile";

const UserPage: React.FC = () => {
  return (
    <Container style={{ paddingTop: "1rem" }}>
      <Navigation />
      <Profile />
    </Container>
  );
};

export default UserPage;
