import firebase from "./firebase";
import { Identity } from "./types";

type BaseModel = {
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
} & Identity;

export type PostModel = {
  caption: string;
  fileName: string;
  fileUrl?: string;
  owner: string;
} & BaseModel;
