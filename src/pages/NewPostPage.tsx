import React from "react";
import { Container } from "semantic-ui-react";
import Navigation from "../containers/Navigation";
import NewPost from "../containers/NewPost";

const NewPostPage: React.FC = () => {
  return (
    <Container style={{ paddingTop: "1rem" }}>
      <Navigation />
      <NewPost />
    </Container>
  );
};

export default NewPostPage;
