import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { PostModel } from "../models";
import FromNow from "./FromNow";
import LikeCount from "./LikeCount";

const PostListItem: React.FC<PostModel> = ({
  caption,
  createdAt,
  fileName,
  id,
  likes,
  owner
}) => {
  const fileUrl = `https://firegram.imgix.net/posts/${id}/${fileName}?w=290`;

  return (
    <Card as={Link} to={`/posts/${id}`}>
      <Image src={fileUrl} />
      <Card.Content>
        <Card.Header>{owner.name}</Card.Header>
        <Card.Description>{caption}</Card.Description>
        <Card.Meta>
          <FromNow seconds={createdAt.seconds} /> &bull;{" "}
          <LikeCount likes={likes} />
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default PostListItem;
