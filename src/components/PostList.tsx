import React from "react";
import { Card } from "semantic-ui-react";
import { PostModel } from "../models";
import PostListItem from "./PostListItem";

type Props = {
  items: Array<PostModel>;
};

const PostList: React.FC<Props> = ({ items }) => {
  return (
    <Card.Group>
      {items.map(item => (
        <PostListItem key={item.id} {...item} />
      ))}
    </Card.Group>
  );
};

export default PostList;
