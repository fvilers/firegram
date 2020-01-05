import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loader, Message } from "semantic-ui-react";
import { AppState, AsyncOperation } from "../redux/state";
import { ProfileModel } from "../models";
import { getProfile } from "../redux/actions/get-profile";
import { updateProfile } from "../redux/actions/update-profile";
import ProfileForm, { ProfileFormValues } from "../components/ProfileForm";

type Params = {
  id: string;
};

const EditProfile: React.FC = () => {
  const { id } = useParams<Params>();
  const getOperation = useSelector<AppState, AsyncOperation>(
    s => s.user.ui.getProfile
  );
  const profile = useSelector<AppState, ProfileModel>(
    s => s.user.collection[id]
  );
  const updateOperation = useSelector<AppState, AsyncOperation>(
    s => s.user.ui.updateProfile
  );
  const dispatch = useDispatch();
  const handleSubmit = ({ name, website, bio }: ProfileFormValues) => {
    dispatch(updateProfile(name, website, bio));
  };

  useEffect(() => {
    dispatch(getProfile(id));
  }, [dispatch, id]);

  if (getOperation.busy) {
    return <Loader active />;
  }

  if (getOperation.errorMessage) {
    return <Message negative>{getOperation.errorMessage}</Message>;
  }

  if (!profile) {
    return <Message negative>Profile not found</Message>;
  }

  return (
    <ProfileForm
      disabled={updateOperation.busy}
      errorMessage={updateOperation.errorMessage}
      onSubmit={handleSubmit}
      values={profile}
    />
  );
};

export default EditProfile;
