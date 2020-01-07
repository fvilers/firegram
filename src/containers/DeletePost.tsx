import React from "react";
import { useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { AppState } from "../redux/state";

type Props = {
  ownerId: string;
};

const DeletePost: React.FC<Props> = ({ ownerId }) => {
  const currentUser = useSelector<AppState, firebase.User | null>(
    s => s.auth.currentUser
  );

  if (currentUser?.uid !== ownerId) {
    return null;
  }

  return (
    <Button basic negative>
      Delete
    </Button>
  );
};

export default DeletePost;
