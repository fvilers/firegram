import React, { useState, FormEvent } from "react";
import { Button, Form, Message, Segment } from "semantic-ui-react";
import { FormProps } from "../types";

export type SignInFormValues = {
  email: string;
  password: string;
};

type Props = FormProps<SignInFormValues>;

const SignInForm: React.FC<Props> = ({ disabled, errorMessage, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
    setPassword("");
  };

  return (
    <Form onSubmit={handleSubmit} size="large">
      <Segment stacked>
        <Form.Input
          autoComplete="email"
          autoFocus
          disabled={disabled}
          fluid
          icon="mail"
          iconPosition="left"
          onChange={e => setEmail(e.target.value)}
          placeholder="E-mail address"
          required
          type="email"
          value={email}
        />
        <Form.Input
          autoComplete="password"
          disabled={disabled}
          fluid
          icon="lock"
          iconPosition="left"
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          type="password"
          value={password}
        />

        {errorMessage && <Message negative>{errorMessage}</Message>}

        <Button
          disabled={disabled}
          fluid
          loading={disabled}
          primary
          size="large"
          type="submit"
        >
          Sign in
        </Button>
      </Segment>
    </Form>
  );
};

export default SignInForm;
