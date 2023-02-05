import UserService from '../../services/UserService';
import AuthService from '../../services/AuthService';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { firebaseAuthInstance, googleProvider } from '../../services/FirebaseService';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';

function Login() {
    const router = useRouter();

    const loginWithGoogle = () => {
        // signInWithPopup(firebaseAuthInstance, googleProvider).then(userCredential => {
        //     const googleUser = userCredential.user;
        //     AuthService.saveToken(googleUser.accessToken);
        //     UserService.saveGoogleUser(googleUser.uid, googleUser.displayName, googleUser.email, googleUser.photoURL)
        //     router.push({
        //         pathname: '/',
        //         // query: { returnUrl: router.asPath }
        //     });
        // }).catch(error => {
        //     // Handle Errors here.
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // The email of the user's account used.
        //     const email = error.customData.email;
        //     // The AuthCredential type that was used.
        //     const credential = GoogleAuthProvider.credentialFromError(error);
        //     // ...
        // })
    }

    const loginWithEmailPassword = () => {
        // signInWithEmailAndPassword(getAuth(), email, password)
    }

    return (
        <div className='p-4 flex flex-col items-center w-full'>
            <h1>Welcome to NoljaNolja</h1>
            <br />

            <div className='flex flex-col gap-2 '>
                <button onClick={() => loginWithGoogle()} className='flex flex-row gap-2 items-center border-1 bg-yellow-200 p-2 rounded-md w-[256px]'>
                    <Image src={"/google-signin.png"} alt='Google Logo' width={32} height={32} />Sign in with Google
                </button>

                <button onClick={() => router.push({ pathname: 'login/signin' })} className='flex flex-row gap-2 items-center border-1 bg-yellow-200 p-2 rounded-md w-[256px]'>
                    <MdOutlineMailOutline size={32} />Sign in with Email/Password
                </button>

            </div>
            Or
            <div className='flex flex-col gap-2 w-128'>
                <button onClick={() => router.push({ pathname: 'login/signup' })} className='flex flex-row gap-2 items-center border-1 bg-yellow-200 p-2 rounded-md w-[256px]'>
                    <FaUserEdit size={32} />Register
                </button>
            </div>
        </div>
    )
}

export default Login;