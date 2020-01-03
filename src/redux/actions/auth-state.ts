import firebase from "../../firebase";

export const AUTH_STATE_CHANGED = "AUTH_STATE_CHANGED";
export const AUTH_STATE_FAILED = "AUTH_STATE_FAILED";

type AuthStateChangedAction = {
  type: typeof AUTH_STATE_CHANGED;
  payload: firebase.User | null;
};

type AuthStateFailedAction = {
  type: typeof AUTH_STATE_FAILED;
  payload: string;
};

export type AuthStateActions = AuthStateChangedAction | AuthStateFailedAction;

export const authStateChanged = (
  user: firebase.User | null
): AuthStateChangedAction => ({
  type: AUTH_STATE_CHANGED,
  payload: user
});

export const authStateFailed = (
  error: firebase.auth.Error
): AuthStateFailedAction => ({
  type: AUTH_STATE_FAILED,
  payload: error.message
});
