import React from "react";
import { Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ProfileModel } from "../models";

type Props = {
  canEdit: boolean;
} & ProfileModel;

const ProfileDetails: React.FC<Props> = ({ canEdit, id, name }) => {
  return (
    <>
      <Header as="h1">{name}</Header>
      {canEdit && <Link to={`/users/${id}/edit`}>Edit profile</Link>}
    </>
  );
};

export default ProfileDetails;
