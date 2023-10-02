import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import useWindowMQ from "../../hook/UseWindowWidth";
import LanguageSwitcher from "../widget/LanguageSwitcher";
import LogoutButton from "../widget/LogoutButton";
import { Box, Drawer } from "../widget/mui";
import SideBar from "./SideBar";

const drawerWidth = 200;
const appBarHeight = 80;


function HomePage() {
    const theme = useTheme();
    const [onOpenDrawer, setOpenDrawer] = useState(false);
    const { isLg, isMd, isSm } = useWindowMQ();

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
                    {isSm && (
                        <MenuIcon onClick={handleDrawerOpen} />
                    )}
                    {!isSm && <img src='pp-yy-white.png' alt='App logo White' height={50} width={126} />}
                </Box>
                <Box gap={2}
                    display="flex"
                    flexDirection="row"
                    alignItems="center">
                    {isMd && <LanguageSwitcher />}
                    <LogoutButton />
                </Box>
            </Box>
            {isSm && (
                <Drawer
                    variant="temporary"
                    PaperProps={{
                        sx: {
                            backgroundColor: '#333333',
                            minWidth: drawerWidth,
                        }
                    }}
                    anchor={'left'}
                    open={onOpenDrawer}
                    onClose={handleDrawerClose}>
                    <Box p={2}>
                        <img src='pp-yy-white.png' alt='App logo White' height={50} width={126} />
                    </Box>
                    <SideBar onDrawerClose={handleDrawerClose} />
                </Drawer>
            )}
            <Box
                display="flex"
                flexDirection="row"
                height={`calc(100vh - ${appBarHeight}px)`}
                sx={{
                    ...(!isMd && { overflowX: 'scroll' })
                }}>
                {isMd && (
                    <Box id='side-bar' sx={{
                        ...(isLg && { minWidth: drawerWidth })
                    }} position="sticky" bgcolor={"black"}>
                        <SideBar onDrawerClose={handleDrawerClose} />
                    </Box>
                )}
                <Box sx={{
                    overflowY: 'auto',
                    overflowX: 'auto',
                    flexGrow: 1
                }}>
                    <Outlet />
                </Box>
            </Box>
        </>
    )
}

export default HomePage;