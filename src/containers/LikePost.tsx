import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Popup } from "semantic-ui-react";
import { AppState, AsyncOperation } from "../redux/state";
import { likePost } from "../redux/actions/like-post";
import { unlikePost } from "../redux/actions/unlike-post";

type Props = {
  id: string;
};

const LikePost: React.FC<Props> = ({ id }) => {
  const currentUser = useSelector<AppState, firebase.User | null>(
    s => s.auth.currentUser
  );
  const hasLiked = useSelector<AppState, boolean>(s =>
    currentUser ? s.post.collection[id]?.likes[currentUser?.uid] : false
  );
  const likeAction = useSelector<AppState, AsyncOperation>(
    s => s.post.ui.likePost
  );
  const unlikeAction = useSelector<AppState, AsyncOperation>(
    s => s.post.ui.unlikePost
  );
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(!hasLiked ? likePost(id) : unlikePost(id));
  };

  if (!currentUser) {
    return null;
  }

  const busy = likeAction.busy || unlikeAction.busy;
  const errorMessage = likeAction.errorMessage || unlikeAction.errorMessage;
  const color = hasLiked ? "red" : undefined;

  return (
    <Popup
      content={errorMessage}
      open={!!errorMessage}
      trigger={
        <Button
          basic
          color={color}
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
