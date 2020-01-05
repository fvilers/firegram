import React, { useState, FormEvent } from "react";
import { Button, Form, Message, TextArea } from "semantic-ui-react";
import { FormProps } from "../types";

export type ProfileFormValues = {
  name: string;
  website?: string;
  bio?: string;
};

type Props = FormProps<ProfileFormValues>;

const ProfileForm: React.FC<Props> = ({
  disabled,
  errorMessage,
  onSubmit,
  values
}) => {
  const [name, setName] = useState(values?.name || "");
  const [website, setWebsite] = useState(values?.website || "");
  const [bio, setBio] = useState(values?.bio || "");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ name, website, bio });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        autoComplete="name"
        autoFocus
        disabled={disabled}
        fluid
        onChange={e => setName(e.target.value)}
        placeholder="Your name"
        required
        value={name}
      />

      <Form.Input
        autoComplete="url"
        disabled={disabled}
        fluid
        onChange={e => setWebsite(e.target.value)}
        placeholder="Website"
        value={website}
      />

      <Form.Field>
        <TextArea
          disabled={disabled}
          onChange={(_e, { value }) => setBio(value as string)}
          placeholder="Bio"
          value={bio}
        />
      </Form.Field>

      {errorMessage && <Message negative>{errorMessage}</Message>}

      <Button disabled={disabled} primary type="submit">
        Save
      </Button>
    </Form>
  );
};

export default ProfileForm;
