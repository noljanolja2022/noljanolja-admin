import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import "../../style/home.css";
import Drawer from '@mui/material/Drawer';
import { SlHome } from "react-icons/sl";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import LanguageSwitcher from "../widget/LanguageSwitcher";
import LogoutButton from "../widget/LogoutButton";
import useWindowWidth from "../../hook/UseWindowWidth";
import { MdOutlineVideocam } from "react-icons/md";
import { GrResources } from "react-icons/gr";

const drawerWidth = 200;
const appBarHeight = 80;

type DrawerItem = {
    text: string;
    icon: React.ReactElement;
    path: string;
}

function HomePage() {
    const { t } = useTranslation();
    const [onOpenDrawer, setOpenDrawer] = useState(false);
    const isWindowSize = useWindowWidth(768);

    const drawerItems: DrawerItem[] = [
        { path: "dashboard", text: t('label_home'), icon: <SlHome size={24} /> },
        { path: "video-management", text: t('label_video'), icon: <MdOutlineVideocam color="white" size={24} /> },
        { path: "content-management", text: t('label_content'), icon: <GrResources color="white" size={24} /> },
        { path: "membership-management", text: t('label_membership'), icon: <CgProfile color="white" size={24} /> },
    ]

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const renderNavs = () => {
        return <ul style={{ padding: 0, margin: 0 }}>
            {drawerItems.map((item, index) => (
                <NavLink to={item.path} key={index} onClick={handleDrawerClose}
                    style={{ textDecoration: 'none', color: 'white' }} >
                    {({ isActive }) =>
                        <div className="sidebar-item" style={{
                            ...(isActive && { backgroundColor: '#aaaaaa' })
                        }}>
                            <div style={{
                                height: '2.5rem',
                                width: '4px',
                                ...(isActive && { backgroundColor: 'yellow' })
                            }}></div>
                            {item.icon}
                            {item.text}
                        </div>
                    }
                </NavLink>
            ))}
        </ul>
    }

    return (
        <>
            <div id='nav-bar' className="bg-[#212121] h-20 flex flex-row justify-between  text-white px-2">
                <div className="flex flex-row gap-4 items-center">
                    {!isWindowSize && (
                        <GiHamburgerMenu size={32} onClick={handleDrawerOpen} />
                    )}
                    <img src='pp-yy-white.png' alt='App logo White' height={50} width={126} />
                </div>
                <div className="flex flex-row gap-4 items-center">
                    <LanguageSwitcher />
                    <LogoutButton />
                </div>
            </div>
            {!isWindowSize && (
                <Drawer
                    variant="temporary"
                    PaperProps={{
                        sx: {
                            backgroundColor: '#333333',
                            width: drawerWidth,
                        }
                    }}
                    anchor={'left'}
                    open={onOpenDrawer}
                    onClose={handleDrawerClose}>
                    {renderNavs()}
                </Drawer>
            )}
            <div className="flex flex-row" style={{ height: `calc(100vh - ${appBarHeight}px)` }}>
                {isWindowSize && (
                    <div id='side-bar' style={{ width: drawerWidth }} className={"sticky bg-[#333333]"}>
                        {renderNavs()}
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