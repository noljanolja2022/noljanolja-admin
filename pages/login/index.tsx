import UserService from '../../services/UserService';
import AuthService from '../../services/AuthService';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GoogleAuthProvider, getAuth, signInWithPopup } from '@firebase/auth';
import { googleProvider } from '../../services/FirebaseService';

function Login() {
    const router = useRouter();

    const loginWithGoogle = () => {
        const auth = getAuth();
        signInWithPopup(auth, googleProvider).then(userCredential => {
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

    return (
        <div className='p-4 flex flex-col items-center w-full'>
            <h1>Welcome to NojaNoja</h1>
            <br />
            <br />
            {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
            <button onClick={() => loginWithGoogle()} className='flex flex-row gap-2 items-center border-1 bg-yellow-200 p-2 rounded-md'>
                <Image src={"/google-signin.png"} alt='Google Logo' width={32} height={32} />Sign in with Google
            </button>
        </div>
    )
}

export default Login;