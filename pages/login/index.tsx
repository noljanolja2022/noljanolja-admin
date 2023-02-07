import UserService from '../../services/UserService';
import AuthService from '../../services/AuthService';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { firebaseAuthInstance, firebaseFunctions, googleProvider } from '../../services/FirebaseService';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import NaverLogin from 'react-naver-login';
import AnalyticService from '../../services/AnalyticService';
import { AccountType } from '../../data/enums/AccountType';
import KakaoLogin from 'react-kakao-login';

function Login() {
    const router = useRouter();

    const loginWithGoogle = () => {
        signInWithPopup(firebaseAuthInstance, googleProvider).then(userCredential => {
            const googleUser = userCredential.user;
            AuthService.saveToken(googleUser.uid);
            UserService.saveGoogleUser(googleUser.uid, googleUser.displayName, googleUser.email, googleUser.photoURL)
            AnalyticService.logLoginEvent(AccountType.GOOGLE)
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
        // signInWithEmailAndPassword(getAuth(), email, password)
    }

    const onKakaoAuthenticated = (response: any, profile?: any) => {
        const token = response.access_token;
        if (token)
            AuthService.getExchangedToken(token, AccountType.KAKAO)
    }

    const onNaverAuthenticated = (naverUser: any) => {

    }

    return (
        <div className='p-4 flex flex-col items-center w-full'>
            <h1>Welcome to NoljaNolja</h1>
            <br />

            <div className='flex flex-col gap-2 '>
                <button className='flex flex-row gap-2 items-center border-1 bg-red-200 p-2 rounded-md w-[256px] h-12'
                    onClick={() => loginWithGoogle()} >
                    <Image src={"/google-signin.png"} alt='Google Logo' width={32} height={32} />Sign in with Google
                </button>
                <button className='flex flex-row gap-2 items-center border-1 bg-blue-200 p-2 rounded-md w-[256px] h-12'
                    onClick={() => router.push({ pathname: 'login/signin' })} >
                    <MdOutlineMailOutline size={32} />Sign in with Email/Password
                </button>

            </div>
            Or
            <div className='flex flex-col gap-2 w-128'>
                <button className='flex flex-row gap-2 items-center border-1 bg-orange-200 p-2 rounded-md w-[256px] h-12'
                    onClick={() => router.push({ pathname: 'login/signup' })} >
                    <FaUserEdit size={32} />Register
                </button>

                <KakaoLogin
                    token='To-be-filled'
                    onSuccess={onKakaoAuthenticated}
                    onFail={(err) => alert(err.error_description)}
                    render={({ onClick }) =>
                        <button className='flex flex-row gap-2 items-center border-1 bg-yellow-200 p-2 rounded-md w-[256px] h-12'
                            onClick={onClick} >
                            <Image src={"/kakao-logo.png"} alt='Kakao Logo' width={32} height={32} />Signin with Kakao (Beta)
                        </button>
                    } />
                <NaverLogin
                    clientId="To-be-filled"
                    callbackUrl="http://127.0.0.1:3000/login"
                    render={(props) =>
                        <button className='flex flex-row gap-2 items-center border-1 bg-green-200 p-2 rounded-md w-[256px] h-12'
                            onClick={props.onClick} >
                            <Image src={"/naver.png"} alt='Kakao Logo' width={32} height={32} />Signin with Naver (Beta)
                        </button>
                    }
                    onSuccess={onNaverAuthenticated}
                    onFailure={() => console.error("Something happened")}
                />
            </div>
        </div>
    )
}

export default Login;