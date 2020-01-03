import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, AsyncOperation } from "../redux/state";
import { createPost } from "../redux/actions/create-post";
import NewPostForm, { NewPostFormValues } from "../components/NewPostForm";

const NewPost: React.FC = () => {
  const { busy, errorMessage } = useSelector<AppState, AsyncOperation>(
    s => s.post.ui.createPost
  );
  const dispatch = useDispatch();
  const handleSubmit = ({
    caption,
    fileContent,
    fileName
  }: NewPostFormValues) => {
    dispatch(createPost(caption, fileContent, fileName));
  };

  return (
    <NewPostForm
      disabled={busy}
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
    />
  );
};

export default NewPost;
