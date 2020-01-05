import React from "react";
import { Grid, Header, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import SignUp from "../containers/SignUp";

const SignUpPage: React.FC = () => {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Create your account
        </Header>
        <SignUp />
        <Message>
          Already have an account? <Link to="/sign-in">Sign in instead</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SignUpPage;
