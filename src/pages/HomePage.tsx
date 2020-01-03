import React from "react";
import Navigation from "../containers/Navigation";
import RecentPosts from "../containers/RecentPosts";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Firegram</h1>
      <Navigation />
      <RecentPosts />
    </div>
  );
};

export default HomePage;
