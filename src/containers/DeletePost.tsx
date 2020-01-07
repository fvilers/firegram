import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Popup } from "semantic-ui-react";
import { AppState, AsyncOperation } from "../redux/state";
import { deletePost } from "../redux/actions/delete-post";

type Props = {
  id: string;
  ownerId: string;
};

const DeletePost: React.FC<Props> = ({ id, ownerId }) => {
  const currentUser = useSelector<AppState, firebase.User | null>(
    s => s.auth.currentUser
  );
  const { busy, errorMessage } = useSelector<AppState, AsyncOperation>(
    s => s.post.ui.deletePost
  );
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(deletePost(id));
  };

  if (currentUser?.uid !== ownerId) {
    return null;
  }

  return (
    <Popup
      content={errorMessage}
      open={!!errorMessage}
      trigger={
        <Button disabled={busy} loading={busy} negative onClick={handleClick}>
          Delete
        </Button>
      }
    />
  );
};

export default DeletePost;
