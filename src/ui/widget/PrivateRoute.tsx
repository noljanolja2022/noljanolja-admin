import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { User } from '../../data/model/UserModels';
import { firebaseAuthInstance } from '../../service/FirebaseService';
import userService from '../../service/UserService';
import { useAuthStore } from '../../store/AuthStore';
import { useUserStore } from '../../store/UserStore';
import { LoginPath } from '../../util/routes';
import LoadingOverlay from './LoadingOverlay';

enum VerifyingState {
    INIT, FAIL, SUCCESS
}

export default function PrivateRoute() {
    const [verified, setVerified] = useState<VerifyingState>(VerifyingState.INIT);
    const { setUser } = useUserStore();
    const { setBearer, clearBearer } = useAuthStore();
    useEffect(() => {
        const observer = firebaseAuthInstance.onAuthStateChanged(nextOrObserver => {
            if (!nextOrObserver) {
                clearBearer()
                setVerified(VerifyingState.FAIL)
            } else {
                nextOrObserver?.getIdToken().then(firebaseToken => {
                    setBearer(firebaseToken)
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
            return <LoadingOverlay forceShowing />
        case VerifyingState.FAIL:
            return <Navigate to={LoginPath} replace />
        default:
            return <Outlet />

    }
}