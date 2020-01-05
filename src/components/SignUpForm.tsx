import React, { useState, FormEvent } from "react";
import { Button, Form, Message, Segment } from "semantic-ui-react";
import { FormProps } from "../types";

export type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
};

type Props = FormProps<SignUpFormValues>;

const SignUpForm: React.FC<Props> = ({ disabled, errorMessage, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, password });
    setPassword("");
  };

  return (
    <Form onSubmit={handleSubmit} size="large">
      <Segment stacked>
        <Form.Input
          autoComplete="name"
          autoFocus
          disabled={disabled}
          fluid
          icon="user"
          iconPosition="left"
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
          required
          value={name}
        />
        <Form.Input
          autoComplete="email"
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

        <Button disabled={disabled} fluid primary size="large" type="submit">
          Sign up
        </Button>
      </Segment>
    </Form>
  );
};

export default SignUpForm;
