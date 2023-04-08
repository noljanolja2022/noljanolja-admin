import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth';
import { firebaseAuthInstance } from '../../service/FirebaseService';
import AuthService from "../../service/AuthService";
import UserService from "../../service/UserService";
import AnalyticService from "../../service/AnalyticService";
import { useState } from "react";
import { Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PrimaryTextField } from "../widget/MuiTextField";
import { ViewState } from "../../data/enum/ViewState";
import { parseFirebaseErr } from "../../util/ErrorMapper";
import { useLoading } from "../../state/LoadingState";

export default function LoginPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { setViewState } = useLoading();
    const [userName, setUserName] = useState('');
    const [unError, setUNError] = useState('');
    const [pwd, setpwd] = useState('');
    const [pwdError, setPwdError] = useState('');
    const [resError, setResError] = useState('');

    const onSignin = () => {
        setResError('')
        const usrErr = userName.length === 0 ? t('error_empty_email') : '';
        const pwdErr = pwd.length === 0 ? t('error_empty_pwd') : '';
        setUNError(usrErr);
        setPwdError(pwdErr);
        if (usrErr || pwdErr) {
            return;
        }
        setViewState(ViewState.LOADING)
        signInWithEmailAndPassword(firebaseAuthInstance, userName, pwd).then(userCredential => {
            const user = userCredential.user;
            user.getIdToken().then(firebaseToken => {
                AuthService.saveToken(firebaseToken);
                UserService.fetchUser().then(res => {
                    if (res.isFailure()) {
                        if (res.error?.name == "401001") {
                            setResError("Your account doesn't have permission to access this. Please contact admin for support.")
                        }
                        return;
                    }
                    UserService.saveUser({
                        id: user.uid,
                        name: user.displayName || undefined,
                        email: user.email || undefined,
                        avatar: user.photoURL || undefined,
                        phone: user.phoneNumber || undefined
                    })
                    AnalyticService.logLoginEvent();
                    navigate('/', { replace: true });
                }).catch(e => {
                    console.log(e)
                    AuthService.clearToken();
                }).finally(() => {
                    setViewState(ViewState.IDLE)
                })
            })
        }).catch((err: any) => {
            setViewState(ViewState.ERROR)
            setResError(parseFirebaseErr(err.code))
        });
    }

    return (
        <div className=' bg-black flex flex-col justify-center items-center overflow-y-auto min-h-screen'>
            <div className="bg-white flex flex-col md:w-96 w-56 py-8 md:px-16 px-8 rounded-2xl my-4 justify-center">
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
                    (주)유니온콘텐츠 UnionContents Co., Ltd<br />
                    TEL : 070-7700-1555<br />
                    ADRESS : 서울시 금천구 디지털로 121 에이스가산타워 906호
                </div>
            </div>
        </div>
    )
}