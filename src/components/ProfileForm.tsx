import React, { useState, FormEvent } from "react";
import { FormProps } from "../types";

export type ProfileFormValues = {
  displayName: string;
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
  const [displayName, setDisplayName] = useState(values?.displayName || "");
  const [website, setWebsite] = useState(values?.website || "");
  const [bio, setBio] = useState(values?.bio || "");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ displayName, website, bio });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <br />
        <input
          autoFocus
          disabled={disabled}
          id="name"
          onChange={e => setDisplayName(e.target.value)}
          required
          value={displayName}
        />
      </div>

      <div>
        <label htmlFor="website">Website</label>
        <br />
        <input
          disabled={disabled}
          id="website"
          onChange={e => setWebsite(e.target.value)}
          type="url"
          value={website}
        />
      </div>

      <div>
        <label htmlFor="bio">Bio</label>
        <br />
        <textarea
          disabled={disabled}
          id="bio"
          onChange={e => setBio(e.target.value)}
          value={bio}
        />
      </div>

      {errorMessage && <div>{errorMessage}</div>}

      <button disabled={disabled} type="submit">
        Save
      </button>
    </form>
  );
};

export default ProfileForm;
