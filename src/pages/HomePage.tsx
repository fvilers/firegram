import React from "react";
import RecentPosts from "../containers/RecentPosts";
import BasePage from "./BasePage";

const HomePage: React.FC = () => {
  return (
    <BasePage>
      <RecentPosts />
    </BasePage>
  );
};

export default HomePage;
