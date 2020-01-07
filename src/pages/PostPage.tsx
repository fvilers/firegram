import React from "react";
import Post from "../containers/Post";
import BasePage from "./BasePage";

const PostPage: React.FC = () => {
  return (
    <BasePage>
      <Post />
    </BasePage>
  );
};

export default PostPage;
