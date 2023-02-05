import UserService from '../../services/UserService';
import AuthService from '../../services/AuthService';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { googleProvider } from '../../services/FirebaseService';

function Login() {
    const router = useRouter();

    const loginWithGoogle = () => {
        signInWithPopup(getAuth(), googleProvider).then(userCredential => {
            const googleUser = userCredential.user;
            AuthService.saveToken(googleUser.accessToken);
            UserService.saveGoogleUser(googleUser.uid, googleUser.displayName, googleUser.email, googleUser.photoURL)
            router.push({
                pathname: '/',
                // query: { returnUrl: router.asPath }
            });
        }).catch(error => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        })
    }

    const loginWithEmailPassword = () => {
        signInWithEmailAndPassword(getAuth(), email, password)
    }

    return (
        <div className='p-4 flex flex-col items-center w-full'>
            <h1>Welcome to NojaNoja</h1>
            <br />

            <button onClick={() => loginWithGoogle()} className='flex flex-row gap-2 items-center border-1 bg-yellow-200 p-2 rounded-md'>
                <Image src={"/google-signin.png"} alt='Google Logo' width={32} height={32} />Sign in with Google
            </button>

            <button onClick={() => loginWithEmailPassword()} className='flex flex-row gap-2 items-center border-1 bg-yellow-200 p-2 rounded-md'>
                <Image src={"/logo192.png"} alt='Email Icon' width={32} height={32} />Sign in with Email and Password
            </button>
        </div>
    )
}

export default Login;