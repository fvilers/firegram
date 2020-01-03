import React from "react";
import { PostModel } from "../models";
import DateTime from "./DateTime";
import { Link } from "react-router-dom";

const PostDetails: React.FC<PostModel> = ({
  caption,
  createdAt,
  fileUrl,
  owner
}) => {
  return (
    <figure>
      <img alt={caption} src={fileUrl} style={{ maxWidth: 400 }} />
      <figcaption>
        <p>{caption}</p>
        <p>
          by <Link to={`/users/${owner.uid}`}>{owner.displayName}</Link>, on{" "}
          <DateTime seconds={createdAt.seconds} />
        </p>
      </figcaption>
    </figure>
  );
};

export default PostDetails;
