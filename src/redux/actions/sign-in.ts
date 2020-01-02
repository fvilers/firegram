import { ThunkAction } from "redux-thunk";
import firebase from "../../firebase";
import { AppState } from "../state";
import history from "../../history";

export const SIGN_IN_STARTED = "SIGN_IN_STARTED";
export const SIGN_IN_SUCCEEDED = "SIGN_IN_SUCCEEDED";
export const SIGN_IN_FAILED = "SIGN_IN_FAILED";

type SignInStartedAction = {
  type: typeof SIGN_IN_STARTED;
  payload: { email: string; password: string; redirect?: string };
};

type SignInSucceededAction = {
  type: typeof SIGN_IN_SUCCEEDED;
  payload: firebase.User;
};

type SignInFailedAction = {
  type: typeof SIGN_IN_FAILED;
  payload: string;
};

const signInStarted = (
  email: string,
  password: string,
  redirect?: string
): SignInStartedAction => ({
  type: SIGN_IN_STARTED,
  payload: { email, password, redirect }
});

const signInSucceeded = (user: firebase.User): SignInSucceededAction => ({
  type: SIGN_IN_SUCCEEDED,
  payload: user
});

const signInFailed = (error: Error): SignInFailedAction => ({
  type: SIGN_IN_FAILED,
  payload: error.message
});

export type SignInActions =
  | SignInStartedAction
  | SignInSucceededAction
  | SignInFailedAction;

export const signIn = (
  email: string,
  password: string,
  redirect?: string
): ThunkAction<void, AppState, null, SignInActions> => async dispatch => {
  dispatch(signInStarted(email, password, redirect));

  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    if (userCredential.user === null) {
      throw new Error("Assertion failed : user shouldn't be null.");
    }

    dispatch(signInSucceeded(userCredential.user));
    history.push(redirect || "/");
  } catch (error) {
    dispatch(signInFailed(error));
  }
};
