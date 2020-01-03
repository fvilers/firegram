import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../redux/state";
import Navigation from "../containers/Navigation";

type Params = {
  id: string;
};

const UserPage: React.FC = () => {
  const { id } = useParams<Params>();
  const currentUser = useSelector<AppState, firebase.User | null>(
    s => s.auth.currentUser
  );

  return (
    <div>
      <h1>User</h1>
      <Navigation />
      {currentUser?.uid === id && (
        <Link to={`/users/${id}/edit`}>Edit profile</Link>
      )}
    </div>
  );
};

export default UserPage;
