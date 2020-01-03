import React from "react";
import NewPostForm, { NewPostFormValues } from "../components/NewPostForm";

const NewPost: React.FC = () => {
  const handleSubmit = (values: NewPostFormValues) => {
    console.log(values);
  };

  return <NewPostForm onSubmit={handleSubmit} />;
};

export default NewPost;
