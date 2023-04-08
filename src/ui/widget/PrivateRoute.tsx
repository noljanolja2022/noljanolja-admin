import { Navigate, Outlet } from 'react-router-dom'
import AuthService from '../../service/AuthService'
const PrivateRoute = () => {
    const token = AuthService.getToken();
    return (
        token ? <Outlet /> : <Navigate to='/login' replace />
    )
}

export default PrivateRoute;