import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Popup } from "semantic-ui-react";
import { AppState, AsyncOperation } from "../redux/state";
import { likePost } from "../redux/actions/like-post";

type Props = {
  id: string;
};

const LikePost: React.FC<Props> = ({ id }) => {
  const currentUser = useSelector<AppState, firebase.User | null>(
    s => s.auth.currentUser
  );
  const { busy, errorMessage } = useSelector<AppState, AsyncOperation>(
    s => s.post.ui.likePost
  );
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(likePost(id));
  };

  if (!currentUser) {
    return null;
  }

  return (
    <Popup
      content={errorMessage}
      open={!!errorMessage}
      trigger={
        <Button
          basic
          disabled={busy}
          icon="like"
          loading={busy}
          onClick={handleClick}
        />
      }
    />
  );
};

export default LikePost;
