import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import BackButton from "../../../components/BackButton";
import { useEffect, useState } from "react";
import { validateEmail } from "../../../utils/StringUtils";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/dist/client/router";
import AuthService from "../../../services/AuthService";
import UserService from "../../../services/UserService";
import { AccountType } from "../../../data/enums/AccountType";
import { firebaseAuthInstance } from "../../../services/FirebaseService";

function Signup() {
    const router = useRouter();
    const [usr, setUsr] = useState('');
    const [isUsrInvalid, setIsUsrInvalid] = useState(false);
    const [pwd, setpwd] = useState('');
    const [repwd, setrepwd] = useState('');


    const onSignup = () => {
        setIsUsrInvalid(!validateEmail(usr))
        if (pwd.length >= 8 && pwd == repwd) {
            createUserWithEmailAndPassword(firebaseAuthInstance, usr, pwd).then(userCredential => {
                const user = userCredential.user;
                AuthService.saveToken(user.uid);
                UserService.saveUser({
                    id: user.uid,
                    name: user.displayName,
                    accountType: AccountType.USERNAME_PASSWORD,
                    email: user.email
                })
                router.push({
                    pathname: '/',
                });
            })
        } else {
            alert('Invalid info to register')
        }
    }

    return (
        <div className='p-4 flex flex-col gap-2 items-center w-full'>
            <BackButton />
            <TextField id="input-email" required label="Email" variant="outlined" value={usr} onChange={(event) => setUsr(event.target.value)} />
            <TextField id="input-password" required type="password" label="Password" variant="outlined" value={pwd} onChange={(event) => setpwd(event.target.value)} />
            <TextField id="input-retype-password" required type="password" label="Re-enter Password" variant="outlined" value={repwd} onChange={(event) => setrepwd(event.target.value)} />

            <Button onClick={() => onSignup()} variant="contained">Signup</Button>
        </div>
    )
}

export default Signup;