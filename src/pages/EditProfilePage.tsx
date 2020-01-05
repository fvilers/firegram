import React from "react";
import { Container } from "semantic-ui-react";
import EditProfile from "../containers/EditProfile";
import Navigation from "../containers/Navigation";

const EditProfilePage: React.FC = () => {
  return (
    <Container style={{ paddingTop: "1rem" }}>
      <Navigation />
      <EditProfile />
    </Container>
  );
};

export default EditProfilePage;
