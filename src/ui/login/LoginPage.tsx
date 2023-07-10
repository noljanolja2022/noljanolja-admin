import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from '@firebase/auth';
import { firebaseAuthInstance } from '../../service/FirebaseService';
import AuthService from "../../service/AuthService";
import UserService from "../../service/UserService";
import AnalyticService from "../../service/AnalyticService";
import Divider from "@mui/material/Divider";
import { parseFirebaseErr } from "../../util/ErrorMapper";
import { useLoadingStore } from "../../store/LoadingStore";
import { useUserStore } from "../../store/UserStore";
import { User } from "../../data/model/UserModels";
import { TextField } from "../widget/mui/TextField";
import { Button } from "../widget/mui/Button";
import { Box } from "../widget/mui/Box";
import { t } from "i18next";
import { Controller, useForm } from "react-hook-form";

interface LoginFormProps {
    username: string;
    password: string;
}

// const LoginSchemaValidator = Yup.object().shape({
//     username: Yup.string().required(t('error_empty_email')),
//     password: Yup.string().required(t('error_empty_pwd')),
// });

export default function LoginPage() {
    const navigate = useNavigate();
    const { setLoading, setIdle } = useLoadingStore();
    const { setUser } = useUserStore();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormProps>({
        // resolver: yupResolver(LoginSchemaValidator),
        defaultValues: {
            password: '',
            username: ''
        }
    });

    const onSignin = (data: LoginFormProps) => {
        setLoading()
        signInWithEmailAndPassword(firebaseAuthInstance, data.username, data.password).then(userCredential => {
            const user = userCredential.user;
            user.getIdToken().then(firebaseToken => {
                AuthService.saveToken(firebaseToken);
                UserService.fetchUser().then(res => {
                    if (res.isFailure()) {
                        if (res.error?.name === "401001") {
                            control.setError("root", { message: "Your account doesn't have permission to access this. Please contact admin for support." })
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
            setIdle()
            control.setError("root", { message: parseFirebaseErr(err.code) })
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
                borderRadius={2} p={4} minWidth={'30vw'} >
                <img src="pp-yy-logo.png" alt="App Logo" />
                <Divider sx={{ minWidth: '80%', marginBottom: 2 }} />
                <form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    width: '80%'
                }} onSubmit={handleSubmit(onSignin)}>
                    <Controller
                        render={({ field: { ref, ...rest } }) => (
                            <TextField {...rest}
                                label={t('hint_pls_enter_id')} required
                                error={errors.username?.message !== undefined}
                                helperText={errors.username?.message} />
                        )}
                        name="username"
                        control={control}
                    />

                    <Controller
                        render={({ field: { ref, ...rest } }) => (
                            <TextField {...rest}
                                type="password"
                                label={t('hint_pls_enter_pwd')} required
                                error={errors.password?.message !== undefined}
                                helperText={errors.password?.message} />
                        )}
                        name="password"
                        control={control}
                    />
                    <Button type="submit">
                        {t('label_login')}
                    </Button>
                    {errors.root?.message !== undefined &&
                        <Box color="red">
                            {errors.root?.message}
                        </Box>}
                </form>
            </Box>
        </Box>
    )
}