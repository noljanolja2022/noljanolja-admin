import * as firebase from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFunctions } from 'firebase/functions';

const FirebaseCredentials: firebase.FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}
// if a Firebase instance doesn't exist, create one
const appInstance = firebase.initializeApp(FirebaseCredentials)
const firebaseAuthInstance = getAuth(appInstance)
const firebaseFunctions = getFunctions(appInstance, process.env.NEXT_PUBLIC_GOOGLE_FUNCTIONS_REGION);
const googleProvider = new GoogleAuthProvider();

export {
    firebaseAuthInstance,
    firebaseFunctions,
    googleProvider
}