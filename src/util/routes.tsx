import { Navigate, Route, Routes } from 'react-router-dom';
import BannerManager from '../ui/banner/BannerManager';
import BrandManager from '../ui/brand/BrandManager';
import CheckinConfigManager from '../ui/checkin/CheckinConfigManager';
import ContentManagement from '../ui/content/ContentManagement';
import DashBoard from '../ui/dashboard/DashBoard';
import GiftManager from '../ui/gift/GiftManager';
import HomePage from '../ui/home/HomePage';
import LoginPage from '../ui/login/LoginPage';
import ReferrerManager from '../ui/referral/ReferralManager';
import ChatConfigManager from '../ui/setting/ChatConfigManager';
import StickerManager from '../ui/sticker/StickerManager';
import UserManager from '../ui/user/UsersManager';
import VideoPromotionManager from '../ui/video-promotion/VideoPromotionManager';
import VideoManager from '../ui/video/VideoManager';
import PrivateRoute from '../ui/widget/PrivateRoute';

export const RoutePaths = {
    dashboard: 'dashboard',
    videoManager: 'video-manager',
    stickerManager: 'sticker-manager',
    userManager: 'user-manager',
    brandManager: 'brand-manager',
    chatRewardConfig: 'chat-reward-config',
    giftManager: 'gift-manager',
    promoteVideoManager: 'video-promotion-manager',
    bannerManager: 'banner',
    checkinManager: 'checkinManager',
    referralManager: 'referralManager'
}

export const LoginPath = "/login"

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<PrivateRoute />} >
                <Route path='/' element={<HomePage />} >
                    <Route path={RoutePaths.dashboard} element={<DashBoard />} />
                    <Route path={RoutePaths.referralManager} element={<ReferrerManager />} />
                    <Route path={RoutePaths.videoManager} element={<VideoManager />} />
                    {/* <Route path={RoutePaths.videoImport} element={<VideoImport />} /> */}
                    <Route path={RoutePaths.stickerManager} element={<StickerManager />} />
                    <Route path='content-management' element={<ContentManagement />} />
                    <Route path={RoutePaths.userManager} element={<UserManager />} />
                    <Route path={RoutePaths.chatRewardConfig} element={<ChatConfigManager />} />
                    <Route path={RoutePaths.giftManager} element={<GiftManager />} />
                    <Route path={RoutePaths.brandManager} element={<BrandManager />} />
                    <Route path={RoutePaths.bannerManager} element={<BannerManager />} />
                    <Route path={RoutePaths.checkinManager} element={<CheckinConfigManager />} />
                    <Route path={RoutePaths.promoteVideoManager} element={<VideoPromotionManager />} />
                    
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
