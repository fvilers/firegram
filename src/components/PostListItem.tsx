import React from "react";
import { Link } from "react-router-dom";
import { PostModel } from "../models";
import DateTime from "./DateTime";

const PostListItem: React.FC<PostModel> = ({
  caption,
  createdAt,
  fileUrl,
  id,
  owner
}) => {
  return (
    <li>
      <figure>
        <Link to={`/posts/${id}`}>
          <img alt={caption} src={fileUrl} style={{ maxWidth: 400 }} />
        </Link>
        <figcaption>
          <p>{caption}</p>
          <p>
            by <Link to={`/users/${owner.uid}`}>{owner.displayName}</Link>, on{" "}
            <DateTime seconds={createdAt.seconds} />
          </p>
        </figcaption>
      </figure>
    </li>
  );
};

export default PostListItem;
