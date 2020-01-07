import React from "react";
import NewPost from "../containers/NewPost";
import BasePage from "./BasePage";

const NewPostPage: React.FC = () => {
  return (
    <BasePage>
      <NewPost />
    </BasePage>
  );
};

export default NewPostPage;
