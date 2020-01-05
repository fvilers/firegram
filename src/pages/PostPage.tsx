import React from "react";
import { Container } from "semantic-ui-react";
import Navigation from "../containers/Navigation";
import Post from "../containers/Post";

const PostPage: React.FC = () => {
  return (
    <Container>
      <Navigation />
      <Post />
    </Container>
  );
};

export default PostPage;
