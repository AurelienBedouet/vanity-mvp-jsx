import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"; // authentication
import {getFirestore} from "firebase/firestore"; //database
import {getStorage} from "firebase/storage"; //storage

const firebaseConfig = {
  // apiKey: process.env.NEXT_APP_API_KEY,
  // authDomain: process.env.NEXT_APP_AUTH_DOMAIN,
  // projectId: process.env.NEXT_APP_PROJECT_ID,
  // storageBucket: process.env.NEXT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_APP_APP_ID,
  apiKey: "AIzaSyCqSBXUkSTqxhNJU_-jxgnXR8SUl8zRdB8",
  authDomain: "vanity-mvp.firebaseapp.com",
  projectId: "vanity-mvp",
  storageBucket: "vanity-mvp.appspot.com",
  messagingSenderId: "139219471041",
  appId: "1:139219471041:web:31b8976a0dfb10a9f1e240"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);