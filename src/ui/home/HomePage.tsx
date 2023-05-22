import { useState } from "react";
import { Outlet } from "react-router-dom";
import LanguageSwitcher from "../widget/LanguageSwitcher";
import LogoutButton from "../widget/LogoutButton";
import useWindowWidth from "../../hook/UseWindowWidth";
import { useTheme } from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from "./SideBar";
import { Box, Drawer } from "../widget/mui";

const drawerWidth = 200;
const appBarHeight = 80;


function HomePage() {
    const theme = useTheme();
    const [onOpenDrawer, setOpenDrawer] = useState(false);
    const isWindowSize = useWindowWidth(768);

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    return (
        <>
            <Box id='nav-bar'
                height={80}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                paddingX={2}
                color={'white'}
                bgcolor={'black'}>
                <Box
                    display="flex"
                    flexDirection="row"
                    gap={2}
                    alignItems="center">
                    {!isWindowSize && (
                        <MenuIcon onClick={handleDrawerOpen} />
                    )}
                    <img src='pp-yy-white.png' alt='App logo White' height={50} width={126} />
                </Box>
                <Box gap={2}
                    display="flex"
                    flexDirection="row"
                    alignItems="center">
                    {isWindowSize && <LanguageSwitcher />}
                    <LogoutButton />
                </Box>
            </Box>
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
                    <SideBar onDrawerClose={handleDrawerClose} />
                </Drawer>
            )}
            <Box
                display="flex"
                flexDirection="row"

                height={`calc(100vh - ${appBarHeight}px)`}
                sx={{
                    ...(!isWindowSize && { overflowX: 'scroll' })
                }}>
                {isWindowSize && (
                    <Box id='side-bar' width={drawerWidth} position="sticky" bgcolor={"black"}>
                        <SideBar onDrawerClose={handleDrawerClose} />
                    </Box>
                )}
                <Outlet />
            </Box>
        </>
    )
}

export default HomePage;