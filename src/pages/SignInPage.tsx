import React from "react";
import { Grid, Header, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import SignIn from "../containers/SignIn";

const SignInPage: React.FC = () => {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Sign in to your account
        </Header>
        <SignIn />
        <Message>
          Don't have an account? <Link to="/sign-up">Sign up now</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SignInPage;
