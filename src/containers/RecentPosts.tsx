import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../redux/state";
import { PostModel } from "../models";
import { toArray } from "../redux/helpers";
import { findPosts } from "../redux/actions/find-posts";
import PostList from "../components/PostList";

const RecentPosts: React.FC = () => {
  const collection = useSelector<AppState, Record<string, PostModel>>(
    s => s.post.collection
  );
  const items = toArray(collection);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findPosts());
  }, [dispatch]);

  return <PostList items={items} />;
};

export default RecentPosts;
