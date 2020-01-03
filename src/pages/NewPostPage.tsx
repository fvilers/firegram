import React from "react";
import Navigation from "../containers/Navigation";
import NewPost from "../containers/NewPost";

const NewPostPage: React.FC = () => {
  return (
    <div>
      <h1>New post</h1>
      <Navigation />
      <NewPost />
    </div>
  );
};

export default NewPostPage;
