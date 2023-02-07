import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import BackButton from "../../../components/BackButton";
import { useEffect, useState } from "react";
import { validateEmail } from "../../../utils/StringUtils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/dist/client/router";
import AuthService from "../../../services/AuthService";
import UserService from "../../../services/UserService";
import { AccountType } from "../../../data/enums/AccountType";
import { firebaseAuthInstance } from "../../../services/FirebaseService";
import AnalyticService from "../../../services/AnalyticService";

function Signin() {
    const router = useRouter();
    const [usr, setUsr] = useState('');
    const [isUsrInvalid, setIsUsrInvalid] = useState(false);
    const [pwd, setpwd] = useState('');


    const onSignin = () => {
        setIsUsrInvalid(!validateEmail(usr))
        if (pwd.length >= 8) {
            signInWithEmailAndPassword(firebaseAuthInstance, usr, pwd).then(userCredential => {
                const user = userCredential.user;
                AuthService.saveToken(user.uid);
                UserService.saveUser({
                    id: user.uid,
                    name: user.displayName,
                    accountType: AccountType.USERNAME_PASSWORD,
                    email: user.email
                })
                AnalyticService.logLoginEvent('Email/Password')
                router.replace({
                    pathname: '/',
                });
            })
        } else {
            alert('Invalid info to Login')
        }
    }

    return (
        <div className='p-4 flex flex-col gap-2 items-center w-full'>
            <BackButton />
            <TextField id="input-email" required label="Email" variant="outlined" value={usr} onChange={(event) => setUsr(event.target.value)} />
            <TextField id="input-password" required type="password" label="Password" variant="outlined" value={pwd} onChange={(event) => setpwd(event.target.value)} />

            <Button onClick={() => onSignin()} variant="contained">Signin</Button>
        </div>
    )
}

export default Signin;