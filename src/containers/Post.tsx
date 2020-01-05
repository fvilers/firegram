import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loader, Message } from "semantic-ui-react";
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
    return <Loader active />;
  }

  if (errorMessage) {
    return <Message negative>{errorMessage}</Message>;
  }

  if (!post) {
    return <Message negative>Post not found</Message>;
  }

  return <PostDetails {...post} />;
};

export default Post;
