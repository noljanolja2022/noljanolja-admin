import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from '@firebase/auth';
import { firebaseAuthInstance } from '../../service/FirebaseService';
import AuthService from "../../service/AuthService";
import UserService from "../../service/UserService";
import AnalyticService from "../../service/AnalyticService";
import { useState, useContext } from "react";
import { validateEmail } from "../../util/StringUtils";
import { Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PrimaryTextField } from "../widget/MuiTextField";
import { AppContext } from "../../context/AppContext";
import { ViewState } from "../../data/enum/ViewState";
import { parseFirebaseErr } from "../../util/ErrorMapper";

function LoginPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { setViewState } = useContext(AppContext);
    const [userName, setUserName] = useState('');
    const [unError, setUNError] = useState('');
    const [pwd, setpwd] = useState('');
    const [pwdError, setPwdError] = useState('');

    const [resError, setResError] = useState('');

    const onSignin = () => {
        setResError('')
        const usrErr = userName.length === 0 ? 'Username is invalid' : '';
        const pwdErr = pwd.length === 0 ? 'Password is invalid' : '';
        setUNError(usrErr);
        setPwdError(pwdErr);
        if (usrErr || pwdErr) {
            return;
        }
        setViewState(ViewState.LOADING)
        signInWithEmailAndPassword(firebaseAuthInstance, userName, pwd).then(userCredential => {
            const user = userCredential.user;
            AuthService.saveToken(user.uid);
            UserService.saveUser({
                id: user.uid,
                name: user.displayName || undefined,
                email: user.email || undefined
            })
            AnalyticService.logLoginEvent()
            setViewState(ViewState.SUCCESS);
            navigate('/', { replace: true });
        }).catch((err: any) => {
            setViewState(ViewState.ERROR)
            setResError(parseFirebaseErr(err.code))
        });
    }

    return (
        <div className='w-screen h-screen bg-black flex flex-col justify-center items-center'>
            <div className="bg-white flex flex-col w-96 py-8 px-16 rounded-2xl justify-center">
                <img src="pp-yy-logo.png" alt="App Logo" />
                <Divider />
                <PrimaryTextField id="input-email"
                    label={t('hint_pls_enter_id')} required
                    className="mb-3 mt-8 border-white hover:border-white"
                    value={userName} error={unError.length > 0} helperText={unError}
                    onChange={(event) => setUserName(event.target.value)} />
                <PrimaryTextField id="input-password" type="password"
                    label={t('hint_pls_enter_pwd')} required
                    className="mb-8 "
                    value={pwd} error={pwdError.length > 0} helperText={pwdError}
                    onChange={(event) => setpwd(event.target.value)} />
                <button className="bg-black mb-4 rounded-lg text-white h-12"
                    onClick={() => onSignin()} >
                    {t('label_login')}
                </button>

                {resError.length > 0 && (<div className="text-red-500">
                    {resError}
                </div>)}

                <Divider className="mt-4" />
                <div className="mt-3 text-xs text-[#BDBDBD]">
                    (주)유니온콘텐츠 UnionContents   Co., Ltd<br />
                    TEL : 070-7700-1555<br />
                    ADRESS : 서울시 금천구 디지털로 121 에이스가산타워 906호
                </div>
            </div>
        </div>
    )
}

export default LoginPage;