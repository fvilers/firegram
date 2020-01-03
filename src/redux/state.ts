import firebase from "../firebase";

export type AsyncOperation = {
  busy: boolean;
  errorMessage?: string;
};

export type AuthState = {
  currentUser: firebase.User | null;
  errorMessage?: string;
  ready: boolean;
  ui: {
    signIn: AsyncOperation;
    signOut: AsyncOperation;
    signUp: AsyncOperation;
  };
};

export type AppState = {
  auth: AuthState;
};
