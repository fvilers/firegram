import { ThunkAction } from "redux-thunk";
import firebase from "../../firebase";
import { AppState } from "../state";
import history from "../../history";

export const SIGN_UP_STARTED = "SIGN_UP_STARTED";
export const SIGN_UP_SUCCEEDED = "SIGN_UP_SUCCEEDED";
export const SIGN_UP_FAILED = "SIGN_UP_FAILED";

type SignUpStartedAction = {
  type: typeof SIGN_UP_STARTED;
  payload: { name: string; email: string; password: string };
};

type SignUpSucceededAction = {
  type: typeof SIGN_UP_SUCCEEDED;
  payload: firebase.User;
};

type SignUpFailedAction = {
  type: typeof SIGN_UP_FAILED;
  payload: string;
};

const signUpStarted = (
  name: string,
  email: string,
  password: string
): SignUpStartedAction => ({
  type: SIGN_UP_STARTED,
  payload: { name, email, password }
});

const signUpSucceeded = (user: firebase.User): SignUpSucceededAction => ({
  type: SIGN_UP_SUCCEEDED,
  payload: user
});

const signUpFailed = (error: Error): SignUpFailedAction => ({
  type: SIGN_UP_FAILED,
  payload: error.message
});

export type SignUpActions =
  | SignUpStartedAction
  | SignUpSucceededAction
  | SignUpFailedAction;

export const signUp = (
  name: string,
  email: string,
  password: string
): ThunkAction<void, AppState, null, SignUpActions> => async dispatch => {
  dispatch(signUpStarted(name, email, password));

  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (user === null) {
      throw new Error("Assertion failed : user shouldn't be null.");
    }

    await user.updateProfile({ displayName: name });
    await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        name,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

    dispatch(signUpSucceeded(user));
    history.push("/");
  } catch (error) {
    dispatch(signUpFailed(error));
  }
};
