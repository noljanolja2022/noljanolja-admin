import { Navigate, Route, Routes } from 'react-router-dom';
import ContentManagement from '../ui/content/ContentManagement';
import DashBoard from '../ui/dashboard/DashBoard';
import HomePage from '../ui/home/HomePage';
import LoginPage from '../ui/login/LoginPage';
import MembershipManagement from '../ui/membership/MembershipManagement';
import VideoManager from '../ui/video/VideoManager';
import PrivateRoute from '../ui/widget/PrivateRoute';
import VideoImport from '../ui/video/VideoImport';
import StickerManager from '../ui/sticker/StickerManager';
import StickerImport from '../ui/sticker/StickerImport';
import UserManager from '../ui/user/UsersManager';
import ChatRewardSetting from '../ui/setting/ChatRewardSetting';

export const RoutePaths = {
    dashboard: 'dashboard',
    videoManager: 'video-manager',
    videoImport: 'video-import',
    stickerManager: 'sticker-manager',
    stickerImport: 'sticker-import',
    userManager: 'user-manager',
    chatRewardConfig: 'chat-reward-config',
}

export const LoginPath = "/login"

export default function NoljaRoutes() {
    return (
        <Routes>
            <Route element={<PrivateRoute />} >
                <Route path='/' element={<HomePage />} >
                    <Route path={RoutePaths.dashboard} element={<DashBoard />} />
                    <Route path='membership-management' element={<MembershipManagement />} />
                    <Route path={RoutePaths.videoManager} element={<VideoManager />} />
                    <Route path={RoutePaths.videoImport} element={<VideoImport />} />
                    <Route path={RoutePaths.stickerImport} element={<StickerImport />} />
                    <Route path={RoutePaths.stickerManager} element={<StickerManager />} />
                    <Route path='content-management' element={<ContentManagement />} />
                    <Route path={RoutePaths.userManager} element={<UserManager />} />
                    <Route path={RoutePaths.chatRewardConfig} element={<ChatRewardSetting />} />
                    <Route index element={<Navigate to={RoutePaths.dashboard} />} />
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
