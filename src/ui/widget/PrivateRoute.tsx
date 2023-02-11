import { Navigate, Outlet } from 'react-router-dom'
import AuthService from '../../service/AuthService'
const PrivateRoute = () => {
    const token = AuthService.getToken();
    console.log(`current Token: ${token}`)
    return (
        token ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoute;