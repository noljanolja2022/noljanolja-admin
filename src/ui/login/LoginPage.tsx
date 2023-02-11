import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { firebaseAuthInstance } from '../../service/FirebaseService';
import { MdOutlineMailOutline } from 'react-icons/md';
import AuthService from "../../service/AuthService";
import UserService from "../../service/UserService";
import AnalyticService from "../../service/AnalyticService";
import { FaUserEdit } from 'react-icons/fa';
import { useState } from "react";
import { validateEmail } from "../../util/StringUtils";
import BackButton from "../widget/BackButton";
import { Button, TextField } from "@mui/material";

function LoginPage() {
    const navigate = useNavigate();
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
                    name: user.displayName || undefined,
                    email: user.email || undefined
                })
                AnalyticService.logLoginEvent()
                navigate('/', { replace: true });
            })
        } else {
            alert('Invalid info to Login')
        }
    }

    return (
        <div className='w-screen h-screen bg-black p-4 flex flex-col justify-center items-center'>
            <div className="bg-white flex flex-col gap-2 w-96 p-8 rounded-md">
                <TextField id="input-email" required label="Email" variant="outlined" value={usr} onChange={(event) => setUsr(event.target.value)} />
                <TextField id="input-password" required type="password" label="Password" variant="outlined" value={pwd} onChange={(event) => setpwd(event.target.value)} />
                <Button onClick={() => onSignin()} variant="contained">Signin</Button>
            </div>
        </div>
    )
}

export default LoginPage;