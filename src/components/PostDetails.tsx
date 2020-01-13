import React from "react";
import { Card, Grid, Image } from "semantic-ui-react";
import { PostModel } from "../models";
import FromNow from "./FromNow";
import LikePost from "../containers/LikePost";
import DeletePost from "../containers/DeletePost";
import { toArray } from "../redux/helpers";

const PostDetails: React.FC<PostModel> = ({
  caption,
  createdAt,
  fileUrl,
  id,
  likes,
  owner
}) => {
  const likesCount = toArray(likes).length;

  return (
    <Grid centered columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Card fluid>
            <Image src={fileUrl} />
            <Card.Content>
              <Card.Header>{owner.name}</Card.Header>
              <Card.Description>{caption}</Card.Description>
              <Card.Meta>
                <FromNow seconds={createdAt.seconds} />
                <br />
                {likesCount} like{likesCount < 2 ? "" : "s"}
              </Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <LikePost id={id} />
              <DeletePost id={id} ownerId={owner.uid} />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default PostDetails;
