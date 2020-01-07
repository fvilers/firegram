import React from "react";
import Profile from "../containers/Profile";
import BasePage from "./BasePage";

const UserPage: React.FC = () => {
  return (
    <BasePage>
      <Profile />
    </BasePage>
  );
};

export default UserPage;
