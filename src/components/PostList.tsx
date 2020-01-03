import React from "react";
import { PostModel } from "../models";
import PostListItem from "./PostListItem";

type Props = {
  items: Array<PostModel>;
};

const PostList: React.FC<Props> = ({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <PostListItem key={item.id} {...item} />
      ))}
    </ul>
  );
};

export default PostList;
