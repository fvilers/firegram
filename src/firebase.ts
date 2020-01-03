import { config } from "dotenv";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  projectId: "firegram-app",
  storageBucket: "firegram-app.appspot.com"
};

firebase.initializeApp(firebaseConfig);

export const toPlainObject = <T>(
  snapshot: firebase.firestore.DocumentSnapshot
): T =>
  (({
    id: snapshot.id,
    ...snapshot.data()
  } as unknown) as T);

export default firebase;
