import { ThunkAction } from "redux-thunk";
import { ProfileModel } from "../../models";
import firebase, { toPlainObject } from "../../firebase";
import { AppState } from "../state";
import history from "../../history";

export const UPDATE_PROFILE_STARTED = "UPDATE_PROFILE_STARTED";
export const UPDATE_PROFILE_SUCCEEDED = "UPDATE_PROFILE_SUCCEEDED";
export const UPDATE_PROFILE_FAILED = "UPDATE_PROFILE_FAILED";

type UpdateProfileStartedAction = {
  type: typeof UPDATE_PROFILE_STARTED;
  payload: {
    name: string;
    website?: string;
    bio?: string;
  };
};

type UpdateProfileSucceededAction = {
  type: typeof UPDATE_PROFILE_SUCCEEDED;
  payload: ProfileModel;
};

type UpdateProfileFailedAction = {
  type: typeof UPDATE_PROFILE_FAILED;
  payload: string;
};

const updateProfileStarted = (
  name: string,
  website?: string,
  bio?: string
): UpdateProfileStartedAction => ({
  type: UPDATE_PROFILE_STARTED,
  payload: { name, website, bio }
});

const updateProfileSucceeded = (
  profile: ProfileModel
): UpdateProfileSucceededAction => ({
  type: UPDATE_PROFILE_SUCCEEDED,
  payload: profile
});

const updateProfileFailed = (error: Error): UpdateProfileFailedAction => ({
  type: UPDATE_PROFILE_FAILED,
  payload: error.message
});

export type UpdateProfileActions =
  | UpdateProfileStartedAction
  | UpdateProfileSucceededAction
  | UpdateProfileFailedAction;

export const updateProfile = (
  name: string,
  website?: string,
  bio?: string
): ThunkAction<void, AppState, null, UpdateProfileActions> => async (
  dispatch,
  getState
) => {
  const { uid } = getState().auth.currentUser!;

  dispatch(updateProfileStarted(name, website, bio));

  try {
    await firebase.auth().currentUser?.updateProfile({ displayName: name });

    const docRef = firebase
      .firestore()
      .collection("users")
      .doc(uid);

    await docRef.update({
      bio,
      name,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      website
    });

    const snapshot = await docRef.get();
    const profile = toPlainObject<ProfileModel>(snapshot);

    dispatch(updateProfileSucceeded(profile));
    history.push(`/users/${uid}`);
  } catch (error) {
    dispatch(updateProfileFailed(error));
  }
};
