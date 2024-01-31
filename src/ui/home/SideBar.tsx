import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import CategoryIcon from '@mui/icons-material/Category';
import ChatIcon from '@mui/icons-material/Chat';
import ChecklistIcon from '@mui/icons-material/Checklist';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RedeemIcon from '@mui/icons-material/Redeem';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import useWindowMQ from "../../hook/UseWindowWidth";
import { RoutePaths } from "../../util/routes";
import { Box, SidebarAccordion, SidebarAccordionSummary, SidebarBox, useTheme } from "../widget/mui";
type DrawerItem = {
    text: string;
    icon?: any;
    path: string;
    subMenu?: DrawerItem[]
}

type Props = {
    onDrawerClose: () => void
}

type SidebarItemProps = {
    item: DrawerItem,
    onDrawerClose: () => void
}

function SideBarItem(props: SidebarItemProps) {
    const { spacing, palette } = useTheme();
    const { isSm, isLg } = useWindowMQ();
    return (
        <NavLink to={props.item.path} onClick={props.onDrawerClose}
            style={{ textDecoration: 'none' }} >
            {({ isActive }) =>
                <SidebarBox sx={{
                    ...(isActive && { backgroundColor: '#5A68FF' })
                }}>
                    <Box sx={{
                        height: '100%',
                        width: spacing(0.5),
                    }} />
                    {props.item.icon}
                    {(isSm || isLg) && props.item.text}
                </SidebarBox>
            }
        </NavLink>
    )
}

export default function SideBar(props: Props) {
    const { t } = useTranslation();

    const drawerItems: DrawerItem[] = [
        { path: RoutePaths.dashboard, text: t('label_dashboard'), icon: <HomeIcon /> },
        { path: RoutePaths.videoManager, text: t('label_video'), icon: <OndemandVideoIcon /> },
        // {
        //     path: "", text: t('label_video'), icon: <OndemandVideoIcon />,
        //     subMenu: [
        //         { path: RoutePaths.videoManager, text: 'List', icon: <FormatListBulletedIcon /> },
        //         { path: RoutePaths.videoImport, text: 'Import', icon: <ImportExportIcon /> }
        //     ]
        // },
        // {
        //     path: "", text: t('label_sticker'), icon: <EmojiEmotionsIcon />,
        //     subMenu: [
        //         { path: RoutePaths.stickerManager, text: 'List', icon: <FormatListBulletedIcon /> },
        //         { path: RoutePaths.stickerImport, text: 'Import', icon: <ImportExportIcon /> }
        //     ]
        // },
        { path: RoutePaths.stickerManager, text: t('label_sticker'), icon: <EmojiEmotionsIcon /> },
        { path: RoutePaths.bannerManager, text: t('label_banner'), icon: <ViewCarouselIcon /> },
        // {
        //     path: "", text: t('label_setting'), icon: <SettingsIcon />,
        //     subMenu: [
        //         { path: RoutePaths.chatRewardConfig, text: t('label_chat_setting'), icon: <ChatIcon /> }
        //     ]
        // },
        { path: RoutePaths.chatRewardConfig, text: t('label_chat_setting'), icon: <ChatIcon /> },
        // { path: "content-management", text: t('label_content'), icon: <DatasetIcon /> },
        { path: RoutePaths.referralManager, text: t('label_referral'), icon: <CardMembershipIcon /> },
        { path: RoutePaths.giftManager, text: t('label_gift'), icon: <RedeemIcon /> },
        { path: RoutePaths.brandManager, text: t('label_brand'), icon: <BrandingWatermarkIcon /> },
        { path: RoutePaths.categoryManager, text: t('label_category'), icon: <CategoryIcon /> },
        { path: RoutePaths.userManager, text: t('label_users'), icon: <PeopleAltIcon /> },
        { path: RoutePaths.checkinManager, text: t('label_checkin_setting'), icon: <ChecklistIcon/>},
        { path: RoutePaths.promoteVideoManager, text: t('label_video_promotion'), icon: <CameraIndoorIcon/>},
        { path: RoutePaths.coinExchangeManager, text: t('label_coin_exchange'), icon: <MonetizationOnIcon/>},
        { path: '', text: t('label_analytic'), icon: <AnalyticsIcon/>, subMenu: [
            {path: RoutePaths.videoAnalyticManager, text: t('label_video_analytic'), icon: <OndemandVideoIcon/>}
        ]}
        //uncomment for debug youtubeapi
        // { path: 'content-management', text: 'test', icon: <CameraIndoorIcon/>},
    ]

    return (
        <ul style={{ padding: 0, margin: 0 }}>
            {drawerItems.map((item, index) => {
                if (item.subMenu?.length || 0 > 0)
                    return <SidebarAccordion key={`${index}`}>
                        <SidebarAccordionSummary >
                            <Box display={'flex'} flexDirection={'row'} gap={1}>
                                {item.icon}
                                {item.text}
                            </Box>
                        </SidebarAccordionSummary>
                        {item.subMenu?.map((subItem, subIndex) =>
                            <SideBarItem item={subItem} key={`${index}-${subIndex}`} onDrawerClose={props.onDrawerClose} />)}
                    </SidebarAccordion>
                return <SideBarItem item={item} key={index} onDrawerClose={props.onDrawerClose} />
            })}
        </ul>
    )
}