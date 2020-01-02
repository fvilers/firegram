import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Firegram</h1>
      <p>
        <Link to="/sign-up">Sign up</Link>
      </p>
    </div>
  );
};

export default HomePage;
