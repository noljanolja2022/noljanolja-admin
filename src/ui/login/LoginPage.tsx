import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from '@firebase/auth';
import { firebaseAuthInstance } from '../../service/FirebaseService';
import AuthService from "../../service/AuthService";
import UserService from "../../service/UserService";
import AnalyticService from "../../service/AnalyticService";
import { FormEvent, useState } from "react";
import Divider from "@mui/material/Divider";
import { parseFirebaseErr } from "../../util/ErrorMapper";
import { useLoadingStore } from "../../store/LoadingStore";
import { useUserStore } from "../../store/UserStore";
import { User } from "../../data/model/UserModels";
import { TextField } from "../widget/mui/TextField";
import { Button } from "../widget/mui/Button";
import { Box } from "../widget/mui/Box";
import { t } from "i18next";
import { Typography } from "../widget/mui";

export default function LoginPage() {
    const navigate = useNavigate();
    const { setLoading, setIdle, setError } = useLoadingStore();
    const { setUser } = useUserStore();
    const [userName, setUserName] = useState('');
    const [unError, setUNError] = useState('');
    const [pwd, setpwd] = useState('');
    const [pwdError, setPwdError] = useState('');
    const [resError, setResError] = useState('');

    const onSignin = (e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setResError('')
        const usrErr = userName.length === 0 ? t('error_empty_email') : '';
        const pwdErr = pwd.length === 0 ? t('error_empty_pwd') : '';
        setUNError(usrErr);
        setPwdError(pwdErr);
        if (usrErr || pwdErr) {
            return;
        }
        setLoading()
        signInWithEmailAndPassword(firebaseAuthInstance, userName, pwd).then(userCredential => {
            const user = userCredential.user;
            user.getIdToken().then(firebaseToken => {
                AuthService.saveToken(firebaseToken);
                UserService.fetchUser().then(res => {
                    if (res.isFailure()) {
                        if (res.error?.name === "401001") {
                            setResError("Your account doesn't have permission to access this. Please contact admin for support.")
                        }
                        return;
                    }
                    const apiUser = res.data!;
                    const newUSer: User = {
                        id: user.uid,
                        name: apiUser.name,
                        email: apiUser.email,
                        avatar: apiUser.avatar,
                        phone: apiUser.phone,
                        gender: apiUser.gender,
                        createdAt: apiUser.createdAt,
                        updatedAt: apiUser.updatedAt,
                    }
                    setUser(newUSer);
                    AnalyticService.logLoginEvent();
                    navigate('/', { replace: true });
                }).catch(e => {
                    AuthService.clearToken();
                }).finally(() => {
                    setIdle()
                })
            })
        }).catch((err: any) => {
            setError()
            setResError(parseFirebaseErr(err.code))
        });
    }

    return (
        <Box
            bgcolor="black"
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh">
            <Box 
            bgcolor="white"
                display="flex"
                flexDirection="column"
                gap={1}
                alignItems="center"
                borderRadius={2} padding={4} minWidth={500} >
                <img src="pp-yy-logo.png" alt="App Logo" />
                <Divider sx={{ minWidth: '80%' }} />
                <form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    width: '80%'
                }} onSubmit={(e) => onSignin(e)}>
                    <TextField id="input-email"
                        label={t('hint_pls_enter_id')} required
                        value={userName} error={unError.length > 0} helperText={unError}
                        onChange={(event) => setUserName(event.target.value)} />
                    <TextField id="input-password" type="password"
                        label={t('hint_pls_enter_pwd')} required
                        value={pwd} error={pwdError.length > 0} helperText={pwdError}
                        onChange={(event) => setpwd(event.target.value)} />
                    <Button type="submit">
                        {t('label_login')}
                    </Button>
                    {resError.length > 0 && 
                    <Box color="red">
                        {resError}
                    </Box>}
                </form>

                <Divider sx={{ minWidth: '80%' }} />
                <Typography paddingTop={0.5} variant="caption" color={'#BDBDBD'} width={'80%'}>
                    (주)유니온콘텐츠 UnionContents Co., Ltd<br />
                    TEL : 070-7700-1555<br />
                    ADRESS : 서울시 금천구 디지털로 121 에이스가산타워 906호
                </Typography>
            </Box>
        </Box>
    )
}