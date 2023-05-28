import { Navigate, Outlet } from 'react-router-dom'
import { firebaseAuthInstance } from '../../service/FirebaseService';
import { useEffect, useState } from 'react';
import LoadingOverlay from './LoadingOverlay';
import authService from '../../service/AuthService';
import userService from '../../service/UserService';
import { User } from '../../data/model/UserModels';
import { useUserStore } from '../../store/UserStore';
import { LoginPath } from '../../util/routes';

enum VerifyingState {
    INIT, FAIL, SUCCESS
}

export default function PrivateRoute() {
    const [verified, setVerified] = useState<VerifyingState>(VerifyingState.INIT);
    const { setUser } = useUserStore();

    useEffect(() => {
        const observer = firebaseAuthInstance.onAuthStateChanged(nextOrObserver => {
            if (!nextOrObserver) {
                authService.clearToken()
                setVerified(VerifyingState.FAIL)
            } else {
                nextOrObserver?.getIdToken().then(firebaseToken => {
                    authService.saveToken(firebaseToken)
                    userService.fetchUser().then(res => {
                        if (res.isFailure()) {
                            alert(res.error)
                        }
                        const apiUser = res.data!;
                        const newUSer: User = {
                            id: apiUser.id,
                            name: apiUser.name,
                            email: apiUser.email,
                            avatar: apiUser.avatar,
                            phone: apiUser.phone,
                            gender: apiUser.gender,
                            createdAt: apiUser.createdAt,
                            updatedAt: apiUser.updatedAt,
                        }
                        setUser(newUSer);
                    }).finally(() => {
                        setVerified(VerifyingState.SUCCESS)
                    })
                }).catch(err => {
                    alert(err)
                    setVerified(VerifyingState.FAIL)
                })
            }
        })
        return () => observer()
    }, [firebaseAuthInstance.currentUser]);

    switch (verified) {
        case VerifyingState.INIT:
            return <LoadingOverlay forceShowing/>
        case VerifyingState.FAIL:
            return <Navigate to={LoginPath} replace />
        default:
            return <Outlet />

    }
}