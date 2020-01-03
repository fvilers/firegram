import React from "react";
import { Link } from "react-router-dom";
import { ProfileModel } from "../models";

type Props = {
  canEdit: boolean;
} & ProfileModel;

const ProfileDetails: React.FC<Props> = ({ canEdit, displayName, id }) => {
  return (
    <div>
      <h2>{displayName}</h2>
      {canEdit && <Link to={`/users/${id}/edit`}>Edit profile</Link>}
    </div>
  );
};

export default ProfileDetails;
