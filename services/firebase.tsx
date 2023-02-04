import Firebase from 'Firebase/app';

const FirebaseCredentials : Firebase.FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}
// if a Firebase instance doesn't exist, create one
if (!Firebase.getApps().length) {
    Firebase.initializeApp(FirebaseCredentials)
}

export default Firebase;