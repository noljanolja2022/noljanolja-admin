import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from 'firebase/functions';

const FirebaseCredentials: firebase.FirebaseOptions = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}
// if a Firebase instance doesn't exist, create one
const appInstance = firebase.initializeApp(FirebaseCredentials)
const firebaseAuthInstance = getAuth(appInstance)
const firebaseFunctions = getFunctions(appInstance, process.env.REACT_APP_GOOGLE_FUNCTIONS_REGION);

export {
    firebaseAuthInstance,
    firebaseFunctions,
}