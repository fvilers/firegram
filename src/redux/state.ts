import firebase from "../firebase";
import { PostModel, ProfileModel } from "../models";

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

export type PostState = {
  collection: Record<string, PostModel>;
  ui: {
    createPost: AsyncOperation;
    deletePost: AsyncOperation;
    findPosts: AsyncOperation;
    getPost: AsyncOperation;
    likePost: AsyncOperation;
    unlikePost: AsyncOperation;
  };
};

export type UserState = {
  collection: Record<string, ProfileModel>;
  ui: {
    getProfile: AsyncOperation;
    updateProfile: AsyncOperation;
  };
};

export type AppState = {
  auth: AuthState;
  post: PostState;
  user: UserState;
};
