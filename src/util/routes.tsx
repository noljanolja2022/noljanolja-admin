import { Navigate, Route, Routes } from 'react-router-dom';
import ContentManagement from '../ui/content/ContentManagement';
import DashBoard from '../ui/dashboard/DashBoard';
import HomePage from '../ui/home/HomePage';
import LoginPage from '../ui/login/LoginPage';
import MembershipManagement from '../ui/membership/MembershipManagement';
import VideoManagement from '../ui/video/VideoList';
import PrivateRoute from '../ui/widget/PrivateRoute';
import VideoImport from '../ui/video/VideoImport';

export const LoginPath = "/login"

export default function NoljaRoutes() {
    return (
        <Routes>
            <Route element={<PrivateRoute />} >
                <Route path='/' element={<HomePage />} >
                    <Route path='dashboard' element={<DashBoard />} />
                    <Route path='membership-management' element={<MembershipManagement />} />
                    <Route path='video-management' element={<VideoManagement />} />
                    <Route path='video-import' element={<VideoImport />} />
                    <Route path='content-management' element={<ContentManagement />} />
                    <Route index element={<Navigate to='dashboard' />} />
                </Route>
            </Route>
            <Route path={LoginPath} element={<LoginPage />} />
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    )
}
