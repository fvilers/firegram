import React from "react";
import Navigation from "../containers/Navigation";
import Profile from "../containers/Profile";

const UserPage: React.FC = () => {
  return (
    <div>
      <h1>User</h1>
      <Navigation />
      <Profile />
    </div>
  );
};

export default UserPage;
