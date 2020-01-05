import React from "react";
import { Card, Grid, Image } from "semantic-ui-react";
import { PostModel } from "../models";
import FromNow from "./FromNow";

const PostDetails: React.FC<PostModel> = ({
  caption,
  createdAt,
  fileUrl,
  owner
}) => {
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
              </Card.Meta>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default PostDetails;
