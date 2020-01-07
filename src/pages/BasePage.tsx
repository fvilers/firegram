import React from "react";
import { Container } from "semantic-ui-react";
import Navigation from "../containers/Navigation";

const BasePage: React.FC = ({ children }) => {
  return (
    <Container style={{ padding: "1rem 0" }}>
      <Navigation />
      {children}
    </Container>
  );
};

export default BasePage;
