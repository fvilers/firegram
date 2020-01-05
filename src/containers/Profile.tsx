import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loader, Message } from "semantic-ui-react";
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
    return <Loader active />;
  }

  if (errorMessage) {
    return <Message negative>{errorMessage}</Message>;
  }

  if (!profile) {
    return <Message negative>Profile not found</Message>;
  }

  return <ProfileDetails canEdit={currentUser?.uid === id} {...profile} />;
};

export default Profile;
