import React, { useState, FormEvent } from "react";
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email address</label>
        <br />
        <input
          autoFocus
          disabled={disabled}
          id="email"
          onChange={e => setEmail(e.target.value)}
          required
          type="email"
          value={email}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input
          disabled={disabled}
          id="password"
          onChange={e => setPassword(e.target.value)}
          required
          type="password"
          value={password}
        />
      </div>

      {errorMessage && <div>{errorMessage}</div>}

      <button disabled={disabled} type="submit">
        Sign in
      </button>
    </form>
  );
};

export default SignInForm;
