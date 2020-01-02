import { config } from "dotenv";
import * as firebase from "firebase/app";

config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY
};

firebase.initializeApp(firebaseConfig);

export default firebase;
