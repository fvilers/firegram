import firebase from "./firebase";
import { Identity } from "./types";

type BaseModel = {
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
} & Identity;

export type PostModel = {
  caption: string;
  fileName: string;
  likes: Record<string, boolean>;
  owner: {
    name: string;
    uid: string;
  };
} & BaseModel;

export type ProfileModel = {
  name: string;
  website?: string;
  bio?: string;
} & BaseModel;
