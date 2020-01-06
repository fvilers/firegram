import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loader, Message } from "semantic-ui-react";
import { AppState, AsyncOperation } from "../redux/state";
import { PostModel } from "../models";
import { toArray } from "../redux/helpers";
import { findPosts } from "../redux/actions/find-posts";
import sortBy from "lodash/sortBy";
import PostList from "../components/PostList";

const RecentPosts: React.FC = () => {
  const { busy, errorMessage } = useSelector<AppState, AsyncOperation>(
    s => s.post.ui.findPosts
  );
  const collection = useSelector<AppState, Record<string, PostModel>>(
    s => s.post.collection
  );
  const items = sortBy(toArray(collection), x => -x.createdAt.seconds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findPosts());
  }, [dispatch]);

  if (busy) {
    return <Loader active />;
  }

  if (errorMessage) {
    return <Message negative>{errorMessage}</Message>;
  }

  return <PostList items={items} />;
};

export default RecentPosts;
