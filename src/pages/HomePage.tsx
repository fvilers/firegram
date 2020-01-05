import React from "react";
import { Container } from "semantic-ui-react";
import Navigation from "../containers/Navigation";
import RecentPosts from "../containers/RecentPosts";

const HomePage: React.FC = () => {
  return (
    <Container style={{ paddingTop: "1rem" }}>
      <Navigation />
      <RecentPosts />
    </Container>
  );
};

export default HomePage;
