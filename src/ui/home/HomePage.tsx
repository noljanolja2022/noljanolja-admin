import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import AuthService from "../../service/AuthService";
import UserService from "../../service/UserService";
import MuiDrawer from '@mui/material/Drawer';
import { Box, CSSObject, CssBaseline, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Theme, ToggleButton, ToggleButtonGroup, Typography, styled, useTheme } from "@mui/material";
import { PrimaryToggleButton } from "../widget/MuiButton";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdLogout } from "react-icons/md";
import { SlHome } from "react-icons/sl";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import LanguageSwitcher from "../widget/LanguageSwitcher";
import LogoutButton from "../widget/LogoutButton";
import useWindowWidth from "../../hook/UseWindowWidth";

const drawerWidth = 200;
const appBarHeight = 80;
const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#212121',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#212121',
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
        '& .MuiPaper-root': {
            backgroundColor: '#333333',
        }
    }),
);


type DrawerItem = {
    text: string;
    icon: React.ReactElement;
    path: string;
}

function HomePage(props: any) {
    const { t, i18n } = useTranslation();
    const [onOpenDrawer, setOpenDrawer] = useState(false);
    const isWindowSize = useWindowWidth(768);

    const drawerItems: DrawerItem[] = [
        { path: "dashboard", text: t('label_home'), icon: <SlHome size={24} /> },
        { path: "membership-management", text: t('label_membership'), icon: <CgProfile color="white" size={24} /> },
    ]

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    return (
        <>
            <div id='nav-bar' className="bg-[#212121] h-20 flex flex-row justify-between items-center text-white px-8">
                
                <img src='pp-yy-white.png' alt='App logo White' height={50} width={126} />
                <div className="flex flex-row gap-8 items-center">
                    <LanguageSwitcher />
                    <LogoutButton />
                </div>
            </div>
            <div className="flex flex-row" style={{
                height: `calc(100vh - ${appBarHeight}px)`,
            }}>
                {isWindowSize && (
                    <div id='side-bar' style={{
                        position: 'sticky',
                        backgroundColor: '#333333',
                        width: drawerWidth
                    }}><ul className="p-0 m-0">
                            {drawerItems.map((item, index) => (
                                <NavLink to={item.path} style={{ textDecoration: 'none' }}>
                                    {({ isActive }) => <li className="text-white flex flex-row justify-start items-center  p-0 h-10 pl-2 hover:bg-gray-500">
                                        {item.icon}
                                        <span className="text-base flex-grow flex flex-row items-center h-10 pl-2 justify-between">
                                            {item.text}
                                            <div className="h-10 w-2" style={{
                                                ...(isActive && { backgroundColor: 'yellow' })
                                            }}></div>
                                        </span>
                                    </li>}
                                </NavLink>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="flex-grow overflow-y-scroll">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default HomePage;