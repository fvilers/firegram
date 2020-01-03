import { ThunkAction } from "redux-thunk";
import { ProfileModel } from "../../models";
import firebase, { toPlainObject } from "../../firebase";
import { AppState } from "../state";

export const GET_PROFILE_STARTED = "GET_PROFILE_STARTED";
export const GET_PROFILE_SUCCEEDED = "GET_PROFILE_SUCCEEDED";
export const GET_PROFILE_FAILED = "GET_PROFILE_FAILED";

type GetProfileStartedAction = {
  type: typeof GET_PROFILE_STARTED;
  payload: { id: string };
};

type GetProfileSucceededAction = {
  type: typeof GET_PROFILE_SUCCEEDED;
  payload: ProfileModel;
};

type GetProfileFailedAction = {
  type: typeof GET_PROFILE_FAILED;
  payload: string;
};

const getProfileStarted = (id: string): GetProfileStartedAction => ({
  type: GET_PROFILE_STARTED,
  payload: { id }
});

const getProfileSucceeded = (
  profile: ProfileModel
): GetProfileSucceededAction => ({
  type: GET_PROFILE_SUCCEEDED,
  payload: profile
});

const getProfileFailed = (error: Error): GetProfileFailedAction => ({
  type: GET_PROFILE_FAILED,
  payload: error.message
});

export type GetProfileActions =
  | GetProfileStartedAction
  | GetProfileSucceededAction
  | GetProfileFailedAction;

export const getProfile = (
  id: string
): ThunkAction<void, AppState, null, GetProfileActions> => async dispatch => {
  dispatch(getProfileStarted(id));

  try {
    const snapshot = await firebase
      .firestore()
      .collection("users")
      .doc(id)
      .get();

    if (!snapshot.exists) {
      throw new Error("Profile not found");
    }
    const profile = toPlainObject<ProfileModel>(snapshot);

    dispatch(getProfileSucceeded(profile));
  } catch (error) {
    dispatch(getProfileFailed(error));
  }
};
