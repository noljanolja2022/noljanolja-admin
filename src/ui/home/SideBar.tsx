import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import DatasetIcon from '@mui/icons-material/Dataset';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Box, SidebarAccordion, SidebarAccordionSummary, SidebarBox, useTheme } from "../widget/mui";
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { useTranslation } from "react-i18next";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { RoutePaths } from "../../util/routes";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatIcon from '@mui/icons-material/Chat';

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

    return (
        <NavLink to={props.item.path} onClick={props.onDrawerClose}
            style={{ textDecoration: 'none' }} >
            {({ isActive }) =>
                <SidebarBox sx={{
                    ...(isActive && { backgroundColor: palette.common.gray[500] })
                }}>
                    <Box sx={{
                        height: '100%',
                        width: spacing(0.5),
                        ...(isActive && { backgroundColor: 'yellow' })
                    }} />
                    {props.item.icon}
                    {props.item.text}
                </SidebarBox>
            }
        </NavLink>
    )
}

export default function SideBar(props: Props) {
    const { t } = useTranslation();

    const drawerItems: DrawerItem[] = [
        { path: RoutePaths.dashboard, text: t('label_home'), icon: <HomeIcon color="primary" /> },
        { path: RoutePaths.videoManager, text: t('label_video'), icon: <OndemandVideoIcon color="primary" /> },
        // {
        //     path: "", text: t('label_video'), icon: <OndemandVideoIcon color="primary" />,
        //     subMenu: [
        //         { path: RoutePaths.videoManager, text: 'List', icon: <FormatListBulletedIcon color="primary" /> },
        //         { path: RoutePaths.videoImport, text: 'Import', icon: <ImportExportIcon color="primary" /> }
        //     ]
        // },
        {
            path: "", text: t('label_sticker'), icon: <EmojiEmotionsIcon color="primary" />,
            subMenu: [
                { path: RoutePaths.stickerManager, text: 'List', icon: <FormatListBulletedIcon color="primary" /> },
                { path: RoutePaths.stickerImport, text: 'Import', icon: <ImportExportIcon color="primary" /> }
            ]
        },
        // {
        //     path: "", text: t('label_setting'), icon: <SettingsIcon color="primary" />,
        //     subMenu: [
        //         { path: RoutePaths.chatRewardConfig, text: t('label_chat_setting'), icon: <ChatIcon color="primary" /> }
        //     ]
        // },
        { path: RoutePaths.chatRewardConfig, text: t('label_chat_setting'), icon: <ChatIcon color="primary" /> },
        // { path: "content-management", text: t('label_content'), icon: <DatasetIcon color="primary" /> },
        { path: "membership-management", text: t('label_membership'), icon: <CardMembershipIcon color="primary" /> },
        { path: RoutePaths.userManager, text: t('label_users'), icon: <PeopleAltIcon color="primary" /> },
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