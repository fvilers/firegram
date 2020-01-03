import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppState, AsyncOperation } from "../redux/state";
import { PostModel } from "../models";
import { getPost } from "../redux/actions/get-post";
import PostDetails from "../components/PostDetails";

type Params = {
  id: string;
};

const Post: React.FC = () => {
  const { id } = useParams<Params>();
  const { busy, errorMessage } = useSelector<AppState, AsyncOperation>(
    s => s.post.ui.getPost
  );
  const post = useSelector<AppState, PostModel>(s => s.post.collection[id]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  if (busy) {
    return <>Loading...</>;
  }

  if (errorMessage) {
    return <>{errorMessage}</>;
  }

  if (!post) {
    return <>Post not found</>;
  }

  return <PostDetails {...post} />;
};

export default Post;
