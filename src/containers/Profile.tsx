import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppState, AsyncOperation } from "../redux/state";
import { ProfileModel } from "../models";
import { getProfile } from "../redux/actions/get-profile";
import ProfileDetails from "../components/ProfileDetails";

type Params = {
  id: string;
};

const Profile: React.FC = () => {
  const { id } = useParams<Params>();
  const currentUser = useSelector<AppState, firebase.User | null>(
    s => s.auth.currentUser
  );
  const { busy, errorMessage } = useSelector<AppState, AsyncOperation>(
    s => s.user.ui.getProfile
  );
  const profile = useSelector<AppState, ProfileModel>(
    s => s.user.collection[id]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(id));
  }, [dispatch, id]);

  if (busy) {
    return <>Loading...</>;
  }

  if (errorMessage) {
    return <>{errorMessage}</>;
  }

  if (!profile) {
    return <>Profile not found</>;
  }

  return <ProfileDetails canEdit={currentUser?.uid === id} {...profile} />;
};

export default Profile;
