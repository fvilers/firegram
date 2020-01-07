import React from "react";
import { Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import BasePage from "./BasePage";

const NotFoundPage: React.FC = () => {
  return (
    <BasePage>
      <Header as="h1">Page not found</Header>
      <p>
        <Link to="/">Back to the home page</Link>
      </p>
    </BasePage>
  );
};

export default NotFoundPage;
