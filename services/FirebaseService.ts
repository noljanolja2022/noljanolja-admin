import * as firebase from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const FirebaseCredentials: firebase.FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}
// if a Firebase instance doesn't exist, create one
const firebaseApp = firebase.initializeApp(FirebaseCredentials)
export const firebaseAuthInstance = getAuth(firebaseApp)
export const googleProvider = new GoogleAuthProvider();