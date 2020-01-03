import { ThunkAction } from "redux-thunk";
import firebase from "../../firebase";
import { AppState } from "../state";

export const SIGN_OUT_STARTED = "SIGN_OUT_STARTED";
export const SIGN_OUT_SUCCEEDED = "SIGN_OUT_SUCCEEDED";
export const SIGN_OUT_FAILED = "SIGN_OUT_FAILED";

type SignOutStartedAction = {
  type: typeof SIGN_OUT_STARTED;
};

type SignOutSucceededAction = {
  type: typeof SIGN_OUT_SUCCEEDED;
};

type SignOutFailedAction = {
  type: typeof SIGN_OUT_FAILED;
  payload: string;
};

const signOutStarted = (): SignOutStartedAction => ({
  type: SIGN_OUT_STARTED
});

const signOutSucceeded = (): SignOutSucceededAction => ({
  type: SIGN_OUT_SUCCEEDED
});

const signOutFailed = (error: Error): SignOutFailedAction => ({
  type: SIGN_OUT_FAILED,
  payload: error.message
});

export type SignOutActions =
  | SignOutStartedAction
  | SignOutSucceededAction
  | SignOutFailedAction;

export const signOut = (): ThunkAction<
  void,
  AppState,
  null,
  SignOutActions
> => async dispatch => {
  dispatch(signOutStarted());

  try {
    await firebase.auth().signOut();

    dispatch(signOutSucceeded());
  } catch (error) {
    dispatch(signOutFailed(error));
  }
};
