import firebase from "../firebase";

export type AsyncOperation = {
  busy: boolean;
  errorMessage?: string;
};

export type AuthState = {
  currentUser: firebase.User | null;
  ui: {
    signIn: AsyncOperation;
    signUp: AsyncOperation;
  };
};

export type AppState = {
  auth: AuthState;
};
