import { getAnalytics } from "firebase/analytics";
import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";

const FirebaseCredentials: firebase.FirebaseOptions = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
}
// if a Firebase instance doesn't exist, create one
const appInstance = firebase.initializeApp(FirebaseCredentials)
const firebaseAuthInstance = getAuth(appInstance)
const firebaseAnalytics = getAnalytics(appInstance);
export {
    firebaseAnalytics, firebaseAuthInstance
};
