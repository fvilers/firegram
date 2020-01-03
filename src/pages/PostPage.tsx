import React from "react";
import Navigation from "../containers/Navigation";
import Post from "../containers/Post";

const PostPage: React.FC = () => {
  return (
    <div>
      <h1>Post</h1>
      <Navigation />
      <Post />
    </div>
  );
};

export default PostPage;
